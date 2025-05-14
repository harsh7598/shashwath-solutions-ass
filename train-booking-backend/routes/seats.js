// routes/seats.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /seats/:trainId - get all seats for a train
router.get('/:trainId', async (req, res) => {
  const { trainId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM seats WHERE train_id = $1 ORDER BY number',
      [trainId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /seats/book - book seats
router.post('/book', async (req, res) => {
  const { userId, trainId, seats } = req.body;
  try {
    // Check if any selected seats are already booked
    const check = await pool.query(
      'SELECT number FROM seats WHERE train_id = $1 AND number = ANY($2::int[]) AND is_booked = true',
      [trainId, seats]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'Some seats are already booked' });
    }

    // Mark the seats as booked
    await pool.query(
      'UPDATE seats SET is_booked = true, booked_by = $1 WHERE train_id = $2 AND number = ANY($3::int[])',
      [userId, trainId, seats]
    );

    res.json({ message: 'Seats booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
