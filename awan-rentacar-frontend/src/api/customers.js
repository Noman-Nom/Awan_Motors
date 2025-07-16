import axios from 'axios';

const API_URL = 'http://localhost:5000/api/customers';

export const getCustomers = async () => (await axios.get(API_URL)).data;
export const addCustomer = async (customer) => (await axios.post(API_URL, customer)).data;
export const updateCustomer = async (customer_id, customer) =>
  (await axios.put(`${API_URL}/${customer_id}`, customer)).data;
export const deleteCustomer = async (customer_id) =>
  (await axios.delete(`${API_URL}/${customer_id}`)).data;
