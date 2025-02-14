// src/utils/response.util.js

// นำเข้า HTTP Status จากไฟล์ httpStatus
const { HTTP_STATUS } = require("./httpStatus");

/**
 * สร้าง Response Format สำหรับการตอบกลับ
 * @param {Object} httpStatus - ข้อมูล status จาก HTTP Status
 * @param {Object} body - เนื้อหาของ Response
 * @param {boolean} times - ระบุว่าต้องการใส่ timestamp หรือไม่
 * @returns {Object} Response ที่มีข้อมูล status, message, timestamp, และ body
 */
function createResponse(httpStatus, body, times = false) {
  return {
    statusCode: httpStatus["statusCode"],
    message: httpStatus["message"],
    timestamp: times ? new Date().toISOString() : undefined,
    body,
  };
}

/**
 * สร้าง Response สำหรับ Kiosk ที่ไม่มี body
 * @param {Object} httpStatus - ข้อมูล status จาก HTTP Status
 * @param {string} message - ข้อความของ Response
 * @returns {Object} Response ที่มีข้อมูล status และ message
 */
function createResponseKiosk(httpStatus, message) {
  return {
    statusCode: httpStatus["statusCode"],
    message: message,
  };
}

module.exports = {
  createResponse,
  createResponseKiosk,
};
