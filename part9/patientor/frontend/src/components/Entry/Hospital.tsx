import { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Typography, Box } from '@mui/material';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Box border={1} borderRadius={2} p={2} mb={2}>
      <Typography variant="h6">
        <strong>{entry.date}</strong> <LocalHospitalIcon fontSize="small" />
      </Typography>

      <Typography><strong>Description:</strong> {entry.description}</Typography>
      <Typography><strong>Specialist:</strong> {entry.specialist}</Typography>

      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <Typography>
          <strong>Diagnosis Codes:</strong> {entry.diagnosisCodes.join(", ")}
        </Typography>
      )}

      <Typography>
        <strong>Discharge:</strong> {entry.discharge.date} - {entry.discharge.criteria}
      </Typography>
    </Box>
  );
};

export default Hospital;
