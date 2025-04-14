import express, { Request, Response } from 'express';
import { nonSensitivePatient, NewPatientEntry } from '../types/types';
import patientService from '../controllers/patient.controllers';
import validatePatientEntry from '../utils';



const router = express.Router();

router.get('/', (_req: Request, res: Response): Response<nonSensitivePatient[]> => {
  return res.send(patientService.getPatientsEntries());
});

router.post('/', (req: Request, res: Response): Response<NewPatientEntry> => {
  const newEntry = validatePatientEntry(req.body);
  const addedEntry = patientService.addNewPatientEntry(newEntry);
  if (!addedEntry) {
    return res.status(400).end();
  }
  return res.send(addedEntry);
});


export default router;