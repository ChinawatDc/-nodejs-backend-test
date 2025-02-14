const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
// กำหนดข้อมูลเริ่มต้นของ Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
  },
  servers: [
    {
      url: process.env.URL || "http://localhost:8080",
    },
  ],
  tags: [{ name: "Users" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "Enter your bearer token in the format **Bearer &lt;token&gt;**",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// กำหนดการตั้งค่า SwaggerJSDoc
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "/src/Swagger/**/*.js")],
};

// สร้าง Swagger JSDoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec,
  swaggerUi,
};
