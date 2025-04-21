import express from 'express';
import diaryRouter from './routes/diaries.route';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});