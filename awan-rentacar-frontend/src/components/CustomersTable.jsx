import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function CustomersTable({ customers, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>CNIC</TableCell>
            <TableCell>Mobile No</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer, index) => (
            <TableRow key={customer.customer_id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Link to={`/customers/${customer.customer_id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                  {customer.name}
                </Link>
              </TableCell>
              <TableCell>{customer.cnic}</TableCell>
              <TableCell>{customer.mobile_no}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="warning"
                  size="small"
                  onClick={() => onEdit(customer)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onDelete(customer.customer_id)}
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
