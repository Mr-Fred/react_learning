import express, { Request, Response } from 'express';
import { nonSensitivePatient, NewPatientEntry } from '../types/types';
import patientService from '../controllers/patient.controllers';
import { errorMiddleware, newPatienEntryParser } from '../middlewares/middlewares';


const router = express.Router();

router.get('/', (_req: Request, res: Response): Response<nonSensitivePatient[]> => {
  return res.send(patientService.getPatientsEntries());
});

router.post('/', newPatienEntryParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<nonSensitivePatient>) => {
  const addedEntry = patientService.addNewPatientEntry(req.body);
  return res.json(addedEntry);
});

router.use(errorMiddleware);


export default router;