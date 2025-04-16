import { nonSensitivePatient, NewPatientEntry, Patient } from "../types/types";
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
      };
      return nonSensitiveData;
    }
  );
  return data;
};

const addNewPatientEntry = (entry: NewPatientEntry): nonSensitivePatient => {
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
  };
};

export default {
  getPatientsEntries,
  addNewPatientEntry,
};
