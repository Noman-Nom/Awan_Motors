import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBookings } from '../api/bookings';
import BookingsTable from '../components/BookingsTable';
import { Container, Typography, Button, Box } from '@mui/material';

export default function CarBookings() {
  const { registration_no } = useParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const allBookings = await getBookings();
    const carBookings = allBookings.filter(
      (b) => b.registration_no === registration_no
    );
    setBookings(carBookings);
  };

  useEffect(() => {
    fetchBookings();
  }, [registration_no]);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h5" component="h2">
          📖 Booking History for {registration_no}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/bookings', { state: { prefillCar: registration_no } })}
        >
          + New Booking for {registration_no}
        </Button>
      </Box>

      {bookings.length ? (
        <BookingsTable
          bookings={bookings}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ) : (
        <Typography>No previous bookings for this car.</Typography>
      )}
    </Container>
  );
}
