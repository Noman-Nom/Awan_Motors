import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCustomerBookings, getCustomers } from '../api/customers';
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, Box, Card, CardContent, Grid
} from '@mui/material';

export default function CustomerDetail() {
  const { customer_id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);

  const formatPKR = (amount) =>
    new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(amount);

  const formatDate = (date) =>
    new Date(date).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

  useEffect(() => {
    const fetchData = async () => {
      const allCustomers = await getCustomers();
      const selected = allCustomers.find(c => c.customer_id === parseInt(customer_id));
      setCustomer(selected);

      const customerBookings = await getCustomerBookings(customer_id);
      // Sort latest first
      setBookings(customerBookings.sort(
        (a, b) => new Date(b.departure_time) - new Date(a.departure_time)
      ));
    };

    fetchData();
  }, [customer_id]);

  if (!customer) return <Typography>Loading...</Typography>;

  const totalRevenue = bookings.reduce((sum, b) => sum + b.profit, 0);

  return (
    <Container>
      <Button
        onClick={() => navigate(-1)}
        variant="outlined"
        sx={{ mb: 2 }}
      >
        ← Back to Customers
      </Button>

      {/* Summary Card */}
      <Card sx={{ mb: 4, backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📋 Customer Details - {customer.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography><b>CNIC:</b> {customer.cnic}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography><b>Mobile:</b> {customer.mobile_no}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography><b>Total Bookings:</b> {bookings.length}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography><b>Total Revenue:</b> {formatPKR(totalRevenue)}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Booking History */}
      <Typography variant="h6" gutterBottom>📖 Booking History</Typography>

      {bookings.length === 0 ? (
        <Typography>No bookings found for this customer.</Typography>
      ) : (
        <Table
          sx={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            '& th': { backgroundColor: '#f0f0f0', fontWeight: 'bold' },
            '& td, & th': { textAlign: 'center', padding: '8px' }
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Car</TableCell>
              <TableCell>Departure</TableCell>
              <TableCell>Arrival</TableCell>
              <TableCell>Profit</TableCell>
              <TableCell>Advance</TableCell>
              <TableCell>Expense</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((b, index) => (
              <TableRow key={b.booking_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link to={`/cars/${b.registration_no}/bookings`} style={{ color: '#1976d2', textDecoration: 'none' }}>
                    {b.registration_no} ({b.model})
                  </Link>
                </TableCell>
                <TableCell>{formatDate(b.departure_time)}</TableCell>
                <TableCell>{formatDate(b.arrival_time)}</TableCell>
                <TableCell>{formatPKR(b.profit)}</TableCell>
                <TableCell>{formatPKR(b.advance)}</TableCell>
                <TableCell>{formatPKR(b.expense)}</TableCell>
                <TableCell>{b.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}
