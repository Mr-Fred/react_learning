import React from 'react';
import { Entry, } from '../../types';
import { Card, CardContent } from '@mui/material';

import OccupationalHealthcare from './OccupationalHealthcare';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const renderEntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case 'HealthCheck':
        return (
          <HealthCheck entry={entry}/>
        );
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcare entry={entry} />
        );
      case 'Hospital':
        return (
          <Hospital entry={entry} />
        );
      default:
        return null;
    }
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '1em' }}>
      <CardContent>
        {renderEntryDetails(entry)}
      </CardContent>
    </Card>
  );
};

export default EntryDetails;
