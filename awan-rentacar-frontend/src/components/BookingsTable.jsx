import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';

export default function BookingsTable({ bookings, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Car</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Reference Name</TableCell>
            <TableCell>Departure</TableCell>
            <TableCell>Arrival</TableCell>
            <TableCell>Profit</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking, index) => (
            <TableRow key={booking.booking_id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{booking.registration_no}</TableCell>
              <TableCell>{booking.customer_name}</TableCell>
              <TableCell>{booking.reference_name}</TableCell>
              <TableCell>{new Date(booking.departure_time).toLocaleString()}</TableCell>
              <TableCell>{new Date(booking.arrival_time).toLocaleString()}</TableCell>
              <TableCell>PKR {booking.profit}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="warning"
                  size="small"
                  onClick={() => onEdit(booking)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onDelete(booking.booking_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
