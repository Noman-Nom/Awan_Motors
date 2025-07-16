import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bookings';

export const getBookings = async () => (await axios.get(API_URL)).data;
export const addBooking = async (booking) => (await axios.post(API_URL, booking)).data;
export const updateBooking = async (booking_id, booking) =>
  (await axios.put(`${API_URL}/${booking_id}`, booking)).data;
export const deleteBooking = async (booking_id) =>
  (await axios.delete(`${API_URL}/${booking_id}`)).data;
