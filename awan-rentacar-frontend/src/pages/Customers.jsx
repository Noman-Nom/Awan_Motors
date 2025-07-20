import { useState, useEffect } from 'react';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../api/customers';
import CustomersTable from '../components/CustomersTable';
import CustomerDialog from '../components/CustomerDialog';
import { Container, Typography, Button, Box, TextField } from '@mui/material';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddEdit = async (customer) => {
    if (editingCustomer) {
      await updateCustomer(editingCustomer.customer_id, customer);
    } else {
      await addCustomer(customer);
    }
    fetchCustomers();
    setOpenDialog(false);
    setEditingCustomer(null);
  };

  const handleDelete = async (customer_id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomer(customer_id);
      fetchCustomers();
    }
  };

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cnic.includes(searchTerm) ||
    c.mobile_no.includes(searchTerm)
  );

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4" component="h1">
          👥 Customers Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          + Add Customer
        </Button>
      </Box>

      {/* Search Bar */}
      <Box mb={3}>
        <TextField
          fullWidth
          label="Search by Name, CNIC, or Mobile No"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <CustomersTable
        customers={filteredCustomers}
        onEdit={(customer) => {
          setEditingCustomer(customer);
          setOpenDialog(true);
        }}
        onDelete={handleDelete}
      />

      <CustomerDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingCustomer(null);
        }}
        onSubmit={handleAddEdit}
        initialData={editingCustomer}
      />
    </Container>
  );
}
