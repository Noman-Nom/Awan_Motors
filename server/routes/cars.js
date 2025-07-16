const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY car_id');
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


// Update car by ID
router.put('/:id', async (req, res) => {
  const { registration_no, model, status, remarks } = req.body;
  try {
    const result = await pool.query(
      `UPDATE cars 
       SET registration_no=$1, model=$2, status=$3, remarks=$4 
       WHERE car_id=$5 RETURNING *`,
      [registration_no, model, status, remarks, req.params.id]
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

// Delete car by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM cars WHERE car_id=$1 RETURNING *',
      [req.params.id]
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
    