const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, c.model AS car_model, cust.name AS customer_name
      FROM bookings b
      JOIN cars c ON b.registration_no = c.registration_no
      JOIN customers cust ON b.customer_id = cust.customer_id
      ORDER BY b.booking_id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a booking
router.post('/', async (req, res) => {
  const {
    registration_no,
    customer_id,
    reference_name,
    reference_mobile,
    departure_time,
    arrival_time,
    profit,
    advance,
    expense,
    remarks
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bookings 
        (registration_no, customer_id, reference_name, reference_mobile, departure_time, arrival_time, profit, advance, expense, remarks)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [registration_no, customer_id, reference_name, reference_mobile, departure_time, arrival_time, profit, advance, expense, remarks]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update booking
router.put('/:booking_id', async (req, res) => {
  const {
    registration_no,
    customer_id,
    reference_name,
    reference_mobile,
    departure_time,
    arrival_time,
    profit,
    advance,
    expense,
    remarks
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE bookings SET 
        registration_no=$1, customer_id=$2, reference_name=$3, reference_mobile=$4,
        departure_time=$5, arrival_time=$6, profit=$7, advance=$8, expense=$9, remarks=$10
       WHERE booking_id=$11 RETURNING *`,
      [registration_no, customer_id, reference_name, reference_mobile, departure_time, arrival_time, profit, advance, expense, remarks, req.params.booking_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete booking
router.delete('/:booking_id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM bookings WHERE booking_id=$1 RETURNING *',
      [req.params.booking_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully', deletedBooking: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
