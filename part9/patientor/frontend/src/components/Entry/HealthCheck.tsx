import { HealthCheckEntry, HealthCheckRating } from "../../types";
import { Typography, Box } from '@mui/material';
import HealthIcon from '@mui/icons-material/HealthAndSafety';

const healthCheckRatingColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy: return 'green';
    case HealthCheckRating.LowRisk: return 'yellow';
    case HealthCheckRating.HighRisk: return 'orange';
    case HealthCheckRating.CriticalRisk: return 'red';
    default: return 'gray';
  }
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Box border={1} borderRadius={2} p={2} mb={2}>
      <Typography variant="h6">
        <strong>{entry.date}</strong> <HealthIcon fontSize="small" />
      </Typography>

      <Typography><strong>Description:</strong> {entry.description}</Typography>
      <Typography><strong>Specialist:</strong> {entry.specialist}</Typography>

      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <Typography>
          <strong>Diagnosis Codes:</strong> {entry.diagnosisCodes.join(", ")}
        </Typography>
      )}

      <Typography>
        <strong>Health Check Rating:</strong>
        <span style={{ color: healthCheckRatingColor(entry.healthCheckRating), marginLeft: '8px' }}>
          {HealthCheckRating[entry.healthCheckRating]}
        </span>
      </Typography>
    </Box>
  );
};

export default HealthCheck;