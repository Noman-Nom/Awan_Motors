import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip,
} from '@mui/material';

export default function CarsTable({ cars, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Registration No</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Remarks</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car, index) => (
            <TableRow key={car.registration_no}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{car.registration_no}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>
                <Chip
                  label={car.status}
                  color={car.status === 'Available' ? 'success' : 'error'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{car.remarks}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="warning"
                  size="small"
                  onClick={() => onEdit(car)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onDelete(car.registration_no)}
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
