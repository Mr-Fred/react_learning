import { z } from 'zod';
import {NewEntrySchema} from '../utils';
import { Request, Response, NextFunction } from 'express';

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({error: error.issues});
  } else {
    next(error);
  }
};

  export {
    newDiaryParser,
    errorMiddleware,
  };