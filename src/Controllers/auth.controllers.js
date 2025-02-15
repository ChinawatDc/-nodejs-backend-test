const bcrypt = require("bcrypt");
const User = require("../Models/user.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
// สมัครสมาชิก
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: { ...newUser.toJSON(), password: undefined },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// เข้าสู่ระบบ
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = { id: user.id, username: user.email, sub: user.name };
    const access_token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    const refresh_token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      message: "Login successful",
      access_token,
      refresh_token,
      user: {
        ...user.toJSON(),
        position: "Software Engineer",
        image: "https://cdn-icons-png.flaticon.com/512/4128/4128244.png",
        password: undefined,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// สร้าง OTP และส่งไปยังอีเมล
const sendOtpToEmail = async (email) => {
  // สร้าง OTP แบบสุ่ม
  const otp = crypto.randomBytes(3).toString("hex");

  // ตั้งค่าการส่งอีเมล
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_TEST,
      pass: process.env.EMAIL_TEST_APP_PSWD,
    },
  });

  // ตั้งค่าเนื้อหาของอีเมล
  const mailOptions = {
    from: "Chinawt Daochai <chinawat.dc@gmail.com>",
    to: email,
    bcc: "chinawat.dc@gmail.com",
    subject: "OTP for Password Change",
    text: `Your OTP for password change is: ${otp}`,
  };

  // ส่งอีเมล
  try {
    await transporter.sendMail(mailOptions);
    return otp;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP");
  }
};

// เปลี่ยนรหัสผ่าน
const changePassword = async (req, res) => {
  try {
    const { otp, password, confirmPassword, newPassword, email } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ตรวจสอบว่า OTP หมดอายุหรือไม่ (5 นาที)
    const otpAge = new Date() - new Date(user.otpCreatedAt);
    const otpExpirationTime = 5 * 60 * 1000; // 5 นาที (ในมิลลิวินาที)
    if (otpAge > otpExpirationTime) {
      // OTP หมดอายุแล้ว
      user.otp = null;
      user.otpCreatedAt = null;
      await user.save();
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (otp !== user.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpCreatedAt = null;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ฟังก์ชันในการร้องขอการเปลี่ยนรหัสผ่าน (ขอ OTP)
const requestPasswordChange = async (req, res) => {
  try {
    const { email } = req.body;

    // ตรวจสอบว่าผู้ใช้มีอยู่ในระบบหรือไม่
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // ส่ง OTP ไปที่อีเมล
    const otp = await sendOtpToEmail(email);
    user.otp = otp;
    user.otpCreatedAt = new Date();
    await user.save();

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login, requestPasswordChange, changePassword };
