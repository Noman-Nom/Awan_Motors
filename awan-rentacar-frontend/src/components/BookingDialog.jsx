import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, MenuItem
} from '@mui/material';
import { useState, useEffect } from 'react';

export default function BookingDialog({ open, onClose, onSubmit, initialData, cars, customers }) {
  const [form, setForm] = useState({
    registration_no: '',
    customer_id: '',
    reference_name: '',
    reference_mobile: '',
    departure_time: '',
    arrival_time: '',
    profit: '',
    advance: '',
    expense: '',
    remarks: ''
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Booking' : 'Add Booking'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              select
              label="Car (Registration No)"
              name="registration_no"
              value={form.registration_no}
              onChange={handleChange}
              required
            >
              {cars.map((car) => (
                <MenuItem key={car.registration_no} value={car.registration_no}>
                  {car.registration_no} - {car.model}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Customer"
              name="customer_id"
              value={form.customer_id}
              onChange={handleChange}
              required
            >
              {customers.map((cust) => (
                <MenuItem key={cust.customer_id} value={cust.customer_id}>
                  {cust.name} ({cust.cnic})
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Reference Name"
              name="reference_name"
              value={form.reference_name}
              onChange={handleChange}
            />
            <TextField
              label="Reference Mobile"
              name="reference_mobile"
              value={form.reference_mobile}
              onChange={handleChange}
            />
            <TextField
              type="datetime-local"
              label="Departure Time"
              name="departure_time"
              value={form.departure_time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              type="datetime-local"
              label="Arrival Time"
              name="arrival_time"
              value={form.arrival_time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Profit"
              name="profit"
              type="number"
              value={form.profit}
              onChange={handleChange}
            />
            <TextField
              label="Advance"
              name="advance"
              type="number"
              value={form.advance}
              onChange={handleChange}
            />
            <TextField
              label="Expense"
              name="expense"
              type="number"
              value={form.expense}
              onChange={handleChange}
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
