import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

export default {
  PORT: Number(process.env.PORT),
  BACKEND_URL: process.env.BACKEND_URL,

  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: Number(process.env.DB_PORT),
  DB_URI: process.env.DB_URI,
};
