import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender'; // Using Transgender as a placeholder for 'Other'
import InfoItem from './infoItem';
import { Patient, Gender } from '../../types'; // Import Entry type

// Define the props for the component
interface PatientInfoProps {
  patient: Patient | null | undefined; // Allow null or undefined for loading/error states
}

// The main Patient Information component
const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
  // Handle cases where patient data is not available (e.g., loading)
  if (!patient) {
    return (
      <Card sx={{ minWidth: 275, m: 2 }}>
        <CardContent>
          <Typography color="text.secondary">
            Loading patient information...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Helper function to get the appropriate gender icon
  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon sx={{ mr: 0.5, verticalAlign: 'middle' }} />;
      case Gender.Female:
        return <FemaleIcon sx={{ mr: 0.5, verticalAlign: 'middle' }} />;
      case Gender.Other:
        // Using TransgenderIcon as a placeholder, choose what fits best
        return <TransgenderIcon sx={{ mr: 0.5, verticalAlign: 'middle' }} />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ minWidth: 275, m: 2 }}>
      <CardContent>
        {/* Patient Name as Title */}
        <Typography variant="h5" component="div" gutterBottom>
          {patient.name}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* --- Patient Details --- */}
          <InfoItem label="Occupation" value={patient.occupation} />
          <InfoItem label="Date of Birth" value={patient.dateOfBirth} />

          {/* Display SSN only if present */}
          {/* Note: Consider security implications of displaying SSN in a real app */}
          <InfoItem label="SSN" value={patient.ssn} />

          {/* --- Gender with Icon --- */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Gender
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {getGenderIcon(patient.gender)}
              <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                {patient.gender}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PatientInfo;
