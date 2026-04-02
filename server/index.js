import express from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import router from './router/index.js';

configDotenv({ path: './.env' });

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);

const PORT = process.env.PORT || 5000;

// Подключение к MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
