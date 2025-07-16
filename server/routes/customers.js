const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY customer_id');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a customer
router.post('/', async (req, res) => {
  const { name, cnic, mobile_no } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customers (name, cnic, mobile_no) VALUES ($1, $2, $3) RETURNING *',
      [name, cnic, mobile_no]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single customer by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers WHERE customer_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update customer
router.put('/:id', async (req, res) => {
  const { name, cnic, mobile_no } = req.body;
  try {
    const result = await pool.query(
      'UPDATE customers SET name=$1, cnic=$2, mobile_no=$3 WHERE customer_id=$4 RETURNING *',
      [name, cnic, mobile_no, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete customer
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM customers WHERE customer_id = $1', [req.params.id]);
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
