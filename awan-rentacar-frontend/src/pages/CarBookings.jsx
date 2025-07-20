import { useParams } from 'react-router-dom';
import { getCustomers } from '../api/customers';
import { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { getBookings, addBooking, updateBooking, deleteBooking } from '../api/bookings';
import BookingDialog from '../components/BookingDialog';
import BookingsTable from '../components/BookingsTable';

export default function CarBookings() {
  const { registration_no } = useParams();
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  const fetchData = async () => {
    const allBookings = await getBookings();
    const carBookings = allBookings.filter(
      (b) => b.registration_no === registration_no
    );
    setBookings(carBookings);

    const allCustomers = await getCustomers();
    setCustomers(allCustomers);
  };

  useEffect(() => {
    fetchData();
  }, [registration_no]);

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
        <Typography variant="h5" component="h2">
          📖 Booking History for {registration_no}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          + New Booking for {registration_no}
        </Button>
      </Box>

      {bookings.length ? (
        <BookingsTable
          bookings={bookings}
          onEdit={(booking) => {
            setEditingBooking(booking);
            setOpenDialog(true);
          }}
          onDelete={handleDelete}
        />
      ) : (
        <Typography>No previous bookings for this car.</Typography>
      )}

      <BookingDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingBooking(null);
        }}
        onSubmit={handleAddEdit}
        initialData={editingBooking}
        prefillCar={registration_no}
        customers={customers} // 👈 Pass customers here
      />
    </Container>
  );
}
