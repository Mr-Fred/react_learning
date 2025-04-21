import { nonSensitivePatient, NewPatientEntry, Patient, EntryWithoutId } from "../types/types";
import patientData from "../data/patients";
import { v4 as uuid } from "uuid";


const getPatientsEntries = (): nonSensitivePatient[] => {
  const data =  patientData.map(
    (data) => {
      const nonSensitiveData: nonSensitivePatient = {
        id: data.id,
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        occupation: data.occupation,
        entries: data.entries,
      };
      return nonSensitiveData;
    }
  );
  return data;
};

const getPatientById = (id: string): nonSensitivePatient | undefined => {
  const patient = patientData.find((patient) => patient.id === id);
  if (!patient) {
    return undefined;
  }
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries
  };
};

const addNewPatient = (entry: NewPatientEntry): nonSensitivePatient => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing data");
  }
  const id = uuid();

  const newPatient: Patient = {
    id,
    ...entry,
  };
  patientData.push(newPatient);
  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    occupation: newPatient.occupation,
    entries: newPatient.entries,
  };
};

const addNewEntry = (id: string, entry: EntryWithoutId): nonSensitivePatient => {
  const patient = patientData.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  const newEntryId = uuid();
  const newEntry = {
    id: newEntryId,
    ...entry,
  };
  patient.entries.push(newEntry);
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  };
};

export default {
  getPatientsEntries,
  addNewPatient,
  getPatientById,
  addNewEntry,
};
