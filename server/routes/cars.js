const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all cars with dynamic status
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.registration_no, c.model, c.remarks,
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM bookings b
            WHERE b.registration_no = c.registration_no
              AND CURRENT_DATE BETWEEN DATE(b.departure_time) AND DATE(b.arrival_time)
          )
          THEN 'Booked'
          ELSE 'Available'
        END AS status
      FROM cars c
      ORDER BY c.registration_no;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Add a car
router.post('/', async (req, res) => {
  const { registration_no, model, status, remarks } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cars (registration_no, model, status, remarks) VALUES ($1, $2, $3, $4) RETURNING *',
      [registration_no, model, status, remarks]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update car
router.put('/:registration_no', async (req, res) => {
  const { model, status, remarks } = req.body;
  try {
    const result = await pool.query(
      'UPDATE cars SET model=$1, status=$2, remarks=$3 WHERE registration_no=$4 RETURNING *',
      [model, status, remarks, req.params.registration_no]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete car
router.delete('/:registration_no', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM cars WHERE registration_no=$1 RETURNING *',
      [req.params.registration_no]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json({ message: 'Car deleted successfully', deletedCar: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
