import { parseArguments } from "./helpers";

type InputValue = number[] | null;
type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(hours?: InputValue, target?: number): Result {
  if (!hours || !target) {
    throw new Error('Parameters missing');
  }

  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour > 0).length;
  const average = hours.reduce((sum, hour) => sum + hour, 0) / periodLength;
  const success = average >= target;

  let rating: Rating;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Excellent work, you met your target!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "You need to improve your consistency";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

// Example usage
try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExercises(value2 as number[], value1));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}