import { useState, useEffect } from 'react';
import { getCars, addCar, updateCar, deleteCar } from '../api/cars';
import CarTable from '../components/CarTable';
import CarDialog from '../components/CarDialog';
import { Container, Typography, Button, Box } from '@mui/material';

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  const fetchCars = async () => {
    const data = await getCars();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAddEdit = async (car) => {
    if (editingCar) {
      await updateCar(editingCar.registration_no, car);
    } else {
      await addCar(car);
    }
    fetchCars();
    setOpenDialog(false);
    setEditingCar(null);
  };

  const handleDelete = async (registration_no) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      await deleteCar(registration_no);
      fetchCars();
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4" component="h1">
          🚘 Cars Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          + Add Car
        </Button>
      </Box>

      <CarTable
        cars={cars}
        onEdit={(car) => {
          setEditingCar(car);
          setOpenDialog(true);
        }}
        onDelete={handleDelete}
      />

      <CarDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingCar(null);
        }}
        onSubmit={handleAddEdit}
        initialData={editingCar}
      />
    </Container>
  );
}
