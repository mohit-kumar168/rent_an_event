const express = require('express');
const pool = require('../models/UserDB');
const router = express.Router();
const crypt = require('../models/bcrypt');

function sendErrorResponse(res, message, statusCode = 400) {
  console.error(message);
  res.status(statusCode).json({ responseMessage: message });
}

// Login Function
const handleLogin = (userType) => async (req, res) => {
  console.log(`${userType} login request received`);
  const { email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [normalizedEmail]);

    if(!rows){
      return sendErrorResponse(res, `${userType} not found`, 404);
    }

    const isMatch = await crypt.compareHash(password, rows[0].password);
    if (!isMatch) return sendErrorResponse(res, 'Invalid password', 401);

    console.log(`${userType} login successful`);
    res.cookie('userType', userType, { maxAge: 900000 });
    res.cookie('email', normalizedEmail, { maxAge: 900000 });
    res.status(200).json({ responseMessage: 'Login Successful' });

  } catch (err) {
    console.error("Login error:", err);
    sendErrorResponse(res, 'Database error', 500);
  }
};


router.post('/traveller/login', handleLogin('traveller'));
router.post('/owner/login', handleLogin('owner'));

// Signup Function
const handleSignup = (userType) => async (req, res) => {
  console.log(`${userType} signup request received`);
  console.log("Received Data:", req.body);

  const { email, firstname, lastname, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    // Check if user already exists
    const [rows] = await new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users WHERE email = ?', [normalizedEmail], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    // Hash the password
    const hashedPassword = await crypt.createHash(password);

    // Construct the new user object
    const newUser = {
      firstname,
      lastname,
      email: normalizedEmail,
      password: hashedPassword,
      created: new Date().toISOString().split('T')[0],  // YYYY-MM-DD format
      isOwner: userType === 'owner' ? 'Y' : 'N'
    };

    // Insert user into the database
    await new Promise((resolve, reject) => {
      pool.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    console.log(`${userType} signed up successfully`);
    res.status(201).json({ responseMessage: `${userType} added successfully` });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ responseMessage: 'Error saving user' });
  }
};

router.post('/traveller/signup', handleSignup('traveller'));
router.post('/owner/signup', handleSignup('owner'));

module.exports = router;