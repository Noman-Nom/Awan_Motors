import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box
} from '@mui/material';
import { useState, useEffect } from 'react';

export default function CarDialog({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    registration_no: '', model: '', status: '', remarks: ''
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Edit Car' : 'Add Car'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Registration No"
              name="registration_no"
              value={form.registration_no}
              onChange={handleChange}
              required
              disabled={!!initialData}
            />
            <TextField
              label="Model"
              name="model"
              value={form.model}
              onChange={handleChange}
              required
            />
            <TextField
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              placeholder="Available / Booked"
              required
            />
            <TextField
              label="Remarks"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
