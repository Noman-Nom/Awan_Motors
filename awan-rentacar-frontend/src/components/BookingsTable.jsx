import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';

export default function BookingsTable({ bookings, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', width: '2%' }}>#</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Car</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Customer</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Reference Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Reference Mobile</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Departure</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Arrival</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Profit</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Advance</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Expense</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Remarks</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking, index) => (
            <TableRow key={booking.booking_id} hover>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{booking.registration_no}</TableCell>
              <TableCell>{booking.customer_name}</TableCell>
              <TableCell>{booking.reference_name}</TableCell>
              <TableCell>{booking.reference_mobile}</TableCell>
              <TableCell>{new Date(booking.departure_time).toLocaleString()}</TableCell>
              <TableCell>{new Date(booking.arrival_time).toLocaleString()}</TableCell>
              <TableCell>PKR {parseFloat(booking.profit).toFixed(2)}</TableCell>
              <TableCell>PKR {parseFloat(booking.advance).toFixed(2)}</TableCell>
              <TableCell>PKR {parseFloat(booking.expense).toFixed(2)}</TableCell>
              <TableCell>{booking.remarks}</TableCell>
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
