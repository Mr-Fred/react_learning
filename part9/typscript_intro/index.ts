import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import {Operation, calculator} from './calculator';
import { calculateExercises } from './exerciseCalculator';

// interface BmiResponse {
//   height: number;
//   weight: number;
//   bmi: string;
// }

const app = express();

app.use(express.json());


app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get("/bmi", async (req: Request, res: Response): Promise<any> => {
  // Extract height and weight from query parameters
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  // Input validation
  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).json({
      error: "Please provide valid numbers for height and weight",
    });
  }
  const bmi = calculateBmi(heightNum, weightNum);
  return res.status(200).json({
    height: heightNum,
    weight: weightNum,
    bmi,
  });
});

app.post('/calculate', async (req: Request, res: Response): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1)) ) { 
    return res.status(400).send({ error: '...'});
  }

  const result = calculator(
    Number(value1),
    Number(value2),
    op as Operation
  );
  return res.send({ result });
});

// Exercise Calculator
app.post('/exercises', async (req: Request, res: Response): Promise<any> => {
  const { daily_exercises, target } = req.body;

  // Input validation
  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((num) => typeof num === 'number') ||
    typeof target !== 'number'
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});