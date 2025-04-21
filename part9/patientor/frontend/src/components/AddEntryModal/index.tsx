import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { EntryType, EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (entry: EntryWithoutId) => void;
}

interface FormValues {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  type: EntryType;
  healthCheckRating?: HealthCheckRating;
  discharge?: { date: string; criteria: string };
  employerName?: string;
  sickLeave?: { startDate: string; endDate: string };
}

const AddEntryModal: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  const [formValues, setFormValues] = useState<FormValues>({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    type: EntryType.HealthCheck,
  });

  const handleChange = (field: string, value: unknown) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSubmit = () => {
    const base = {
      description: formValues.description,
      date: formValues.date,
      specialist: formValues.specialist,
      diagnosisCodes: formValues.diagnosisCodes,
      type: formValues.type
    };

    let entry: EntryWithoutId;
    switch (type) {
      case EntryType.HealthCheck:
        entry = {
          ...base,
          type: EntryType.HealthCheck,
          healthCheckRating: formValues.healthCheckRating!
        };
        break;
      case EntryType.Hospital:
        entry = { 
          ...base, 
          type: EntryType.Hospital, 
          discharge: formValues.discharge!
        };
        break;
      case EntryType.OccupationalHealthcare:
        entry = {
          ...base,
          type: EntryType.OccupationalHealthcare,
          employerName: formValues.employerName!,
          sickLeave: formValues.sickLeave?.startDate && formValues.sickLeave?.endDate
            ? formValues.sickLeave : undefined
        };
        break;
      default:
        throw new Error("Unknown entry type");
    }

    onSubmit(entry);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Entry</DialogTitle>
      <DialogContent>
        {/* Base Fields */}
        <TextField
          label="Description"
          fullWidth margin="normal"
          value={formValues.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={formValues.date}
          onChange={(e) => handleChange('date', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Specialist"
          fullWidth
          margin="normal"
          value={formValues.specialist}
          onChange={(e) => handleChange('specialist', e.target.value)}
        />

        <TextField
          label="Diagnosis Codes"
          fullWidth
          margin="normal"
          value={formValues.diagnosisCodes.join(', ')}
          onChange={(e) => handleChange('diagnosisCodes', e.target.value.split(',').map(code => code.trim()))}
        />
        
        {/* Entry Type Selector */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Entry Type</InputLabel>
          <Select value={type} onChange={(e) => {
            setType(e.target.value as EntryType);
            handleChange('type', e.target.value as EntryType);
          }}>
            <MenuItem value={EntryType.HealthCheck}>Health Check</MenuItem>
            <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
            <MenuItem value={EntryType.OccupationalHealthcare}>Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>

        {/* Type-specific Fields */}
        {type === EntryType.HealthCheck && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              value={formValues.healthCheckRating ?? ''}
              onChange={
                (e) => handleChange(
                  'healthCheckRating',
                  Number(e.target.value) as HealthCheckRating
                )
              }
            >
              {Object.keys(HealthCheckRating)
                .filter(key => !isNaN(Number(key)))
                .map(num => (
                  <MenuItem key={num} value={num}>{HealthCheckRating[Number(num)]}</MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

        {type === EntryType.Hospital && (
          <>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              margin="normal"
              value={formValues.discharge?.date ?? ''}
              onChange={(e) => setFormValues({
                ...formValues,
                discharge: {
                  ...formValues.discharge,
                  date: e.target.value,
                  criteria: formValues.discharge?.criteria ?? ''
                }
              })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth margin="normal"
              onChange={
                (e) => setFormValues({
                  ...formValues,
                  discharge: {
                    ...formValues.discharge,
                    criteria: e.target.value,
                    date: formValues.discharge?.date ?? ''
                  }
                })
              }
            />
          </>
        )}

        {type === EntryType.OccupationalHealthcare && (
          <>
            <TextField
              label="Employer Name"
              fullWidth margin="normal"
              value={formValues.employerName ?? ''}
              onChange={
                (e) => handleChange('employerName', e.target.value)
              }
            />
            <TextField
              label="Sick Leave Start"
              type="date"
              fullWidth
              onChange={
                (e) => setFormValues({
                  ...formValues,
                  sickLeave: {
                    ...formValues.sickLeave,
                    startDate: e.target.value,
                    endDate: formValues.sickLeave?.endDate ?? ''
                  }
                })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
            />
            <TextField
              label="Sick Leave End"
              type="date"
              onChange={
                (e) => setFormValues({
                  ...formValues,
                  sickLeave: {
                    ...formValues.sickLeave,
                    endDate: e.target.value,
                    startDate: formValues.sickLeave?.startDate ?? ''
                  }
                })
              }
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Add Entry</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEntryModal;
