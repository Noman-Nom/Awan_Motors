import { useState, useEffect } from 'react';
import { getBookings, addBooking, updateBooking, deleteBooking } from '../api/bookings';
import { getCars } from '../api/cars';
import { getCustomers } from '../api/customers';
import BookingsTable from '../components/BookingsTable';
import BookingDialog from '../components/BookingDialog';
import { Container, Typography, Button, Box } from '@mui/material';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  const fetchData = async () => {
    setBookings(await getBookings());
    setCars(await getCars());
    setCustomers(await getCustomers());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEdit = async (booking) => {
    if (editingBooking) {
      await updateBooking(editingBooking.booking_id, booking);
    } else {
      await addBooking(booking);
    }
    fetchData();
    setOpenDialog(false);
    setEditingBooking(null);
  };

  const handleDelete = async (booking_id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      await deleteBooking(booking_id);
      fetchData();
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4" component="h1">
          📖 Bookings Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          + Add Booking
        </Button>
      </Box>

      <BookingsTable
        bookings={bookings}
        onEdit={(booking) => {
          setEditingBooking(booking);
          setOpenDialog(true);
        }}
        onDelete={handleDelete}
      />

      <BookingDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingBooking(null);
        }}
        onSubmit={handleAddEdit}
        initialData={editingBooking}
        cars={cars}
        customers={customers}
      />
    </Container>
  );
}
