import { z } from 'zod';
import { Response, Request, NextFunction } from 'express';
import { newPatientEntrySchema, entrySchema } from '../utils';

const newPatienEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    entrySchema.parse(req.body);
    next();
  }
  catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({error: error.issues});
    } else{
        next(error);
    }
};


export {
    newPatienEntryParser,
    errorMiddleware,
    newEntryParser
};