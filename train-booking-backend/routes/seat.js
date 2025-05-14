// routes/seat.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Seat API works");
});

module.exports = router;
