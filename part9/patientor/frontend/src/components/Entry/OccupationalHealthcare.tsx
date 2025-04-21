import { OccupationalHealthcareEntry } from "../../types";
import { Typography, Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Box border={1} borderRadius={2} p={2} mb={2}>
      <Typography variant="h6">
        <strong>{entry.date}</strong> <WorkIcon fontSize="small" /> <em>{entry.employerName}</em>
      </Typography>

      <Typography><strong>Description:</strong> {entry.description}</Typography>
      <Typography><strong>Specialist:</strong> {entry.specialist}</Typography>

      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <Typography>
          <strong>Diagnosis Codes:</strong> {entry.diagnosisCodes.join(", ")}
        </Typography>
      )}

      {entry.sickLeave && (
        <Typography>
          <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </Typography>
      )}
    </Box>
  );
};

export default OccupationalHealthcare;
