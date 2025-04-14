import {Diagnosis} from '../types/types';
import diagnosesData from '../data/diagnoses';

export const getDiagnosisEntries = (): Diagnosis[] => {
  return diagnosesData;
};