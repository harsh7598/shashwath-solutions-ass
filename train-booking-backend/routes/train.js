const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /trains - fetch available trains
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM trains');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
