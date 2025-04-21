import { Typography, Grid } from '@mui/material';

interface InfoItemProps {
  label: string;
  value?: string | null;
}

// Helper component for displaying label-value pairs
const InfoItem: React.FC<InfoItemProps> = ({ label, value }: InfoItemProps) => {
  // Don't render if value is missing or empty
  if (value === null || value === undefined || value === '') return null;
  return (
    <Grid item xs={12} sm={6}>
      <Typography
        variant="body2"
        color="text.secondary"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Grid>
  );
};

export default InfoItem;