type Values = { 
  value1: number;
  value2: number | number[]
};

export const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 12) throw new Error("Too many arguments");

  const value1 = Number(args[2]);

  if (isNaN(value1)) {
    throw new Error("Provided value1 is not a number");
  }

  if (args.length === 4) {
    const value2 = Number(args[3]);
    if (isNaN(value2)) {
      throw new Error("Provided value2 is not a number");
    }
    return { value1, value2 };
  }

  const value2: number[] = args.slice(3).map(arg => {
    const num = Number(arg);
    if (isNaN(num)) {
      throw new Error("Provided value2 contains non-number values");
    }
    return num;
  });

  return { value1, value2 };
};
