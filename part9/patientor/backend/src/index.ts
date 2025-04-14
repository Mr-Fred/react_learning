import express, { Request, Response } from 'express';
import diagnosisRouter from './routes/diagnosis.route';
import patientRouter from './routes/patient.route';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req: Request, res: Response) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
