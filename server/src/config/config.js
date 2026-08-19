import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

export default {
  PORT: Number(process.env.PORT),
  BACKEND_URL: process.env.BACKEND_URL,
  DB_URI: process.env.DB_URI,
};
