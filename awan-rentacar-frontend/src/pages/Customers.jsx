import { useState, useEffect } from 'react';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../api/customers';
import CustomersTable from '../components/CustomersTable';
import CustomerDialog from '../components/CustomerDialog';
import { Container, Typography, Button, Box } from '@mui/material';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

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

      <CustomersTable
        customers={customers}
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
