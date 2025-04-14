export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type nonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

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