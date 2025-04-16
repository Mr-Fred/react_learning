import {z} from 'zod';
import { newPatientEntrySchema } from '../utils';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type nonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatientEntry = z.infer<typeof newPatientEntrySchema>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}