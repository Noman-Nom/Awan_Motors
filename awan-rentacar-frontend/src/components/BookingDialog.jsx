import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import { addCustomer } from '../api/customers'; // make sure this exists

export default function BookingDialog({ open, onClose, onSubmit, initialData, prefillCar, customers = [] }) {
  const [form, setForm] = useState({
    registration_no: prefillCar || '',
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

  const [customerOptions, setCustomerOptions] = useState(customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: '',
    cnic: '',
    mobile_no: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      const existingCustomer = customers.find(c => c.customer_id === initialData.customer_id);
      setSelectedCustomer(existingCustomer || null);
    } else {
      setForm((prev) => ({ ...prev, registration_no: prefillCar }));
      setSelectedCustomer(null);
    }
  }, [initialData, prefillCar, customers]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNewCustomerChange = (e) => {
    setNewCustomerForm({ ...newCustomerForm, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = async () => {
    if (!newCustomerForm.name || !newCustomerForm.cnic || !newCustomerForm.mobile_no) {
      alert('Please fill all customer fields');
      return;
    }

    const newCustomer = await addCustomer(newCustomerForm); // API call to save
    const updatedCustomers = [...customerOptions, newCustomer];
    setCustomerOptions(updatedCustomers);
    setSelectedCustomer(newCustomer);
    setForm({ ...form, customer_id: newCustomer.customer_id });
    setShowAddCustomer(false);
    setNewCustomerForm({ name: '', cnic: '', mobile_no: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.customer_id) {
      alert('Please select a customer.');
      return;
    }
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Booking' : `Add Booking for ${prefillCar}`}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {/* Customer Autocomplete */}
            <Autocomplete
              options={customerOptions}
              getOptionLabel={(option) => option.name ? `${option.name} (${option.cnic})` : ''}
              value={selectedCustomer}
              onChange={(e, newValue) => {
                if (newValue) {
                  setSelectedCustomer(newValue);
                  setForm({ ...form, customer_id: newValue.customer_id });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Customer" required />
              )}
              noOptionsText={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>No customer found</Typography>
                  <Button size="small" onClick={() => setShowAddCustomer(true)}>➕ Add New Customer</Button>
                </Box>
              }
            />

            {/* Inline New Customer Form */}
            {showAddCustomer && (
              <Box display="flex" flexDirection="column" gap={1} p={1} border="1px solid #ccc" borderRadius={2}>
                <Typography variant="subtitle1">Add New Customer</Typography>
                <TextField
                  label="Name"
                  name="name"
                  value={newCustomerForm.name}
                  onChange={handleNewCustomerChange}
                  required
                />
                <TextField
                  label="CNIC"
                  name="cnic"
                  value={newCustomerForm.cnic}
                  onChange={handleNewCustomerChange}
                  required
                />
                <TextField
                  label="Mobile No"
                  name="mobile_no"
                  value={newCustomerForm.mobile_no}
                  onChange={handleNewCustomerChange}
                  required
                />
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Button onClick={() => setShowAddCustomer(false)} color="secondary">Cancel</Button>
                  <Button onClick={handleAddCustomer} variant="contained" color="primary">Save</Button>
                </Box>
              </Box>
            )}

            {/* Other Booking Fields */}
            <TextField
              label="Reference Name"
              name="reference_name"
              value={form.reference_name}
              onChange={handleFormChange}
            />
            <TextField
              label="Reference Mobile"
              name="reference_mobile"
              value={form.reference_mobile}
              onChange={handleFormChange}
            />
            <TextField
              type="datetime-local"
              label="Departure Time"
              name="departure_time"
              value={form.departure_time}
              onChange={handleFormChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              type="datetime-local"
              label="Arrival Time"
              name="arrival_time"
              value={form.arrival_time}
              onChange={handleFormChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Profit"
              name="profit"
              type="number"
              value={form.profit}
              onChange={handleFormChange}
            />
            <TextField
              label="Advance"
              name="advance"
              type="number"
              value={form.advance}
              onChange={handleFormChange}
            />
            <TextField
              label="Expense"
              name="expense"
              type="number"
              value={form.expense}
              onChange={handleFormChange}
            />
            <TextField
              label="Remarks"
              name="remarks"
              value={form.remarks}
              onChange={handleFormChange}
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
