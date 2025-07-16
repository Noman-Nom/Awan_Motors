import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cars';

export const getCars = async () => (await axios.get(API_URL)).data;
export const addCar = async (car) => (await axios.post(API_URL, car)).data;
export const updateCar = async (registration_no, car) =>
  (await axios.put(`${API_URL}/${registration_no}`, car)).data;
export const deleteCar = async (registration_no) =>
  (await axios.delete(`${API_URL}/${registration_no}`)).data;
