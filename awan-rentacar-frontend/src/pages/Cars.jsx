import { useState, useEffect } from 'react';
import { getCars, addCar, updateCar, deleteCar } from '../api/cars';
import CarForm from '../components/CarForm';
import CarTable from '../components/CarTable';

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchCars = async () => {
    const data = await getCars();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAdd = async (car) => {
    await addCar(car);
    fetchCars();
    setShowForm(false);
  };

  const handleUpdate = async (car) => {
    await updateCar(editingCar.registration_no, car);
    setEditingCar(null);
    fetchCars();
    setShowForm(false);
  };

  const handleDelete = async (registration_no) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      await deleteCar(registration_no);
      fetchCars();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚘 Cars Management</h1>
      <button
        onClick={() => { setEditingCar(null); setShowForm(true); }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Car
      </button>

      <CarTable cars={cars} onEdit={(car) => { setEditingCar(car); setShowForm(true); }} onDelete={handleDelete} />

      {showForm && (
        <CarForm
          onClose={() => setShowForm(false)}
          onSubmit={editingCar ? handleUpdate : handleAdd}
          initialData={editingCar}
        />
      )}
    </div>
  );
}
