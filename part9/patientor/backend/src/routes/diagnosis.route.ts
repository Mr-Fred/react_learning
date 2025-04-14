import express, {Request, Response} from 'express';
import {Diagnosis} from '../types/types';
import {getDiagnosisEntries} from '../controllers/diagnosis.controllers';

const router = express.Router();

router.get('/', (_req: Request, res: Response): Response<Diagnosis[]> => {
    return res.send(getDiagnosisEntries());
});

export default router;