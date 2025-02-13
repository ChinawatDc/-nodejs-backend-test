FROM node:14-alpine

# สร้าง directory และตั้งค่า working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# คัดลอก package.json และติดตั้ง dependencies
COPY package.json /usr/src/app/
RUN npm install --force

# คัดลอกโค้ดทั้งหมด
COPY . /usr/src/app

# เปิดพอร์ต 8080
EXPOSE 8080

# รันแอปพลิเคชัน
CMD ["npm", "start"]
