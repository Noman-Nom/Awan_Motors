import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cars';

export const getCars = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addCar = async (car) => {
  const res = await axios.post(API_URL, car);
  return res.data;
};

export const updateCar = async (registration_no, car) => {
  const res = await axios.put(`${API_URL}/${registration_no}`, car);
  return res.data;
};

export const deleteCar = async (registration_no) => {
  const res = await axios.delete(`${API_URL}/${registration_no}`);
  return res.data;
};
