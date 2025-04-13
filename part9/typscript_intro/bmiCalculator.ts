// import { parseArguments } from "./helpers";

export function calculateBmi(height?: number, weight?: number): string {
  if (!height || !weight) {
    throw new Error('Height and weight are required parameters');
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters ** 2);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

// Example usage
if (require.main === module) {
  try {
    console.log(calculateBmi());
  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
}

// try {
//   const { value1, value2 } = parseArguments(process.argv);
//   console.log(calculateBmi(value1, value2 as number));
// } catch (error: unknown) {
//   let errorMessage = 'Something went wrong: '
//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }
//   console.log(errorMessage);
// }