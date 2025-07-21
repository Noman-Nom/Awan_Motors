const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ Get all customers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY customer_id');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ✅ Add a customer (with CNIC uniqueness check)
router.post('/', async (req, res) => {
  const { name, cnic, mobile_no } = req.body;

  try {
    // Check if CNIC already exists
    const cnicCheck = await pool.query(
      'SELECT customer_id FROM customers WHERE cnic=$1',
      [cnic]
    );

    if (cnicCheck.rows.length > 0) {
      return res.status(400).json({ error: 'CNIC already exists for another customer' });
    }

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

// ✅ Update customer (with CNIC uniqueness check)
router.put('/:customer_id', async (req, res) => {
  const { name, cnic, mobile_no } = req.body;

  try {
    // Check if CNIC belongs to another customer
    const cnicCheck = await pool.query(
      'SELECT customer_id FROM customers WHERE cnic=$1 AND customer_id<>$2',
      [cnic, req.params.customer_id]
    );

    if (cnicCheck.rows.length > 0) {
      return res.status(400).json({ error: 'CNIC already exists for another customer' });
    }

    const result = await pool.query(
      'UPDATE customers SET name=$1, cnic=$2, mobile_no=$3 WHERE customer_id=$4 RETURNING *',
      [name, cnic, mobile_no, req.params.customer_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ✅ Delete customer
router.delete('/:customer_id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM customers WHERE customer_id=$1 RETURNING *',
      [req.params.customer_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully', deletedCustomer: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:customer_id/bookings', async (req, res) => {
  try {
    const customerId = parseInt(req.params.customer_id);
    if (isNaN(customerId)) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }

    const result = await pool.query(
      `SELECT b.*, c.model
       FROM bookings b
       JOIN cars c ON b.registration_no = c.registration_no
       WHERE b.customer_id = $1
       ORDER BY b.departure_time DESC`,
      [customerId]
    );

    // Always return JSON
    res.json(result.rows || []);
  } catch (err) {
    console.error('Error fetching customer bookings:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
