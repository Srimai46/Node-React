// โหลดค่า environment จากไฟล์ .env
import dotenv from 'dotenv';
dotenv.config();

// export ค่า config ออกไปใช้ใน project
export const config = {
  port: process.env.PORT || 4000,              // กำหนด port ของ server
  jwtSecret: process.env.JWT_SECRET || 'dev', // secret key สำหรับ JWT
  dbUrl: process.env.DATABASE_URL,            // URL ของ MySQL ที่ Prisma ใช้
  nodeEnv: process.env.NODE_ENV || 'development', // mode ของ Node.js
};
