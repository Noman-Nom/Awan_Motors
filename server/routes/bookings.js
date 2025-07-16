const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        b.*, 
        c.registration_no, 
        cu.name AS customer_name 
      FROM bookings b
      JOIN cars c ON b.car_id = c.car_id
      JOIN customers cu ON b.customer_id = cu.customer_id
      ORDER BY booking_id DESC
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
    car_id,
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
        (car_id, customer_id, reference_name, reference_mobile, departure_time, arrival_time, profit, advance, expense, remarks)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [car_id, customer_id, reference_name, reference_mobile, departure_time, arrival_time, profit, advance, expense, remarks]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single booking
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings WHERE booking_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  const {
    car_id,
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
        car_id=$1, customer_id=$2, reference_name=$3, reference_mobile=$4,
        departure_time=$5, arrival_time=$6, profit=$7, advance=$8, expense=$9, remarks=$10
       WHERE booking_id=$11 RETURNING *`,
      [car_id, customer_id, reference_name, reference_mobile, departure_time, arrival_time, profit, advance, expense, remarks, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM bookings WHERE booking_id = $1', [req.params.id]);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
