import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PatientService from '../../services/patients'; 
import axios from 'axios';
import { Button } from '@mui/material';
import { Container, Alert, CircularProgress, Box } from '@mui/material';

import PatientInfo from './PatientInfo';
import EntryDetails from '../Entry';
import AddEntryModal from '../AddEntryModal';

import { Patient, EntryWithoutId } from '../../types';


const PatientDetailPage: React.FC = () => {
  // Get the 'id' parameter from the URL (defined in App.tsx route)
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const submitNewEntry = async (entry: EntryWithoutId) => {
    // Call API or state update logic here
    try {
      // Call the API to update the patient's entries
      const updatedPatient = await PatientService.updateEntries(id, entry);
      setPatient(updatedPatient); 
      
    } catch (error) {
      console.error('Error submitting new entry:', error);
      setError('Failed to add new entry. Please try again.');
    } finally {
      handleClose(); // Close the modal after submission
    }
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (!id) {
        setError('No patient ID provided.');
        setPatient(null);
        return;
      }

      // Reset state for potential navigation between patient pages
      setPatient(undefined);
      setError(null);

      try {
        // Fetch the FULL details for the specific patient
        // Ensure your backend API at /api/patients/:id returns the full Patient object
        // including ssn and potentially entries if needed later.
        const patientDetails = await PatientService.getOne(id);
        setPatient(patientDetails);
      } catch (e: unknown) {
        console.error('Failed to fetch patient details:', e);
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 404) {
            setError(`Patient with ID '${id}' not found.`);
          } else if (e?.response?.data && typeof e?.response?.data === 'string') {
            setError(`Error fetching patient: ${e.response.data}`);
          } else {
            setError('An error occurred while fetching patient data.');
          }
        } else {
          setError('An unknown error occurred.');
        }
        setPatient(null); // Set to null to indicate error/not found
      }
    };

    void fetchPatientDetails();
  }, [id]); // Re-run the effect if the ID changes

  // Loading state
  if (patient === undefined) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Error state
  if (error || patient === null) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error || 'Patient data could not be loaded.'}
        </Alert>
      </Container>
    );
  }

  // Success state - Render the PatientInfo component
  return (
    <div>
      <Container sx={{ mt: 2 }}>
        <PatientInfo patient={patient} />
        <Box sx={{ mt: 2 }}>
          {patient.entries && patient.entries.length > 0 ? (
            patient.entries.map((entry) => (
              <EntryDetails key={entry.id} entry={entry} />
            ))
          ) : (
            <Alert severity="info">No entries available for this patient.</Alert>
          )}
        </Box>
      </Container>

      <Button variant="contained" onClick={handleOpen}>
        Add New Entry
      </Button>

      <AddEntryModal
        open={modalOpen}
        onClose={handleClose}
        onSubmit={submitNewEntry}
      />
    </div>
  );
};

export default PatientDetailPage;
