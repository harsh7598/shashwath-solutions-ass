const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const foundUser = user.rows[0];

    // Check password (plaintext here – should be hashed in production)
    if (foundUser.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Success
    res.status(200).json({
      message: "Login successful",
      user: { id: foundUser.id, name: foundUser.name, email: foundUser.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
