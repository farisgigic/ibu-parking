import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
}
export default config;