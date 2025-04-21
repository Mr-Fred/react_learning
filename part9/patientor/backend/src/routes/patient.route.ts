import express, { Request, Response } from 'express';
import { nonSensitivePatient, NewPatientEntry, EntryWithoutId } from '../types/types';
import patientService from '../controllers/patient.controllers';
import { errorMiddleware, newPatienEntryParser, newEntryParser } from '../middlewares/middlewares';


const router = express.Router();

router.get('/', (_req: Request, res: Response): Response<nonSensitivePatient[]> => {
  return res.send(patientService.getPatientsEntries());
});

router.get('/:id', (req: Request, res: Response): Response<nonSensitivePatient | string> => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) {
    return res.status(404).send('Patient not found');
  }
  return res.send(patient);
});

router.post('/', newPatienEntryParser, (
  req: Request<unknown, unknown, NewPatientEntry>, 
  res: Response<nonSensitivePatient>) => {
  const addedEntry = patientService.addNewPatient(req.body);
  return res.json(addedEntry);
});

router.post('/:id/entries', newEntryParser, (
  req: Request<{ id: string }, unknown, EntryWithoutId>, 
  res: Response): Response<nonSensitivePatient | string> => {
  const patient = patientService.addNewEntry(req.params.id, req.body);
  if (!patient) {
    return res.status(404).send('Patient not found');
  }
  return res.send(patient);
});

router.use(errorMiddleware);


export default router;