const express = require('express');
const pool = require('../models/UserDB.js');
const router = express.Router();
const multer = require('multer');
const async = require('async');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    const timestamp = Date.now();
    cb(null, `${file.originalname.split('.')[0]}-${timestamp}.${fileExtension}`);
  },
});
const upload = multer({ storage });

// Helper function for sending responses
const sendResponse = (res, status, message) => res.status(status).json({ responseMessage: message });

// Add Property
router.post('/owner/listproperty', upload.array('uploadedPhoto', 5), (req, res) => {
  const filenames = req.files.map(file => file.filename);
  const userData = { ...req.body, ...Object.fromEntries(filenames.map((file, index) => [`image${index + 1}`, file])) };

  pool.query('INSERT INTO property SET ?', userData, (error) => {
    if (error) return sendResponse(res, 400, 'Database error');
    sendResponse(res, 200, 'Property Added');
  });
});

// List all Properties
router.get("/property", async (req, res) => {
  try {
      const query = "SELECT * FROM property";
      pool.query(query, (err, results) => {
          if (err) {
              console.error("Database Error:", err);
              return res.status(500).json({ error: "Database error", details: err });
          }
          console.log("Fetched Properties:", results);
          res.status(200).json(results);
      });
  } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});



// Search Property
router.post('/property/search', (req, res) => {
  const { startDate, endDate, city, noOfGuests } = req.body;
  const query = `
    SELECT * FROM property
    WHERE uid NOT IN (
      SELECT propertyID FROM bookings
      WHERE (? BETWEEN bookedFrom AND bookedTo OR ? BETWEEN bookedFrom AND bookedTo)
    )
    AND city = ? AND startDate <= ? AND endDate >= ? AND sleeps >= ?`;

  pool.query(query, [startDate, endDate, city.toLowerCase(), startDate, endDate, noOfGuests], (error, result) => {
    if (error) return sendResponse(res, 400, 'Database error');
    res.status(200).json(result);
  });
});

// Get Property by ID
router.get('/property/:id', (req, res) => {
  pool.query('SELECT * FROM property WHERE uid = ?', [req.params.id], (error, result) => {
    if (error || result.length === 0) return sendResponse(res, 404, 'Property not found');
    res.status(200).json(result);
  });
});

// Get Booking by ID
router.get('/bookings/:id', (req, res) => {
  pool.query('SELECT * FROM bookings WHERE bookingID = ?', [req.params.id], (error, result) => {
    if (error || result.length === 0) return sendResponse(res, 404, 'Booking not found');
    res.status(200).json(result);
  });
});

// List Property by Owner
router.post('/owner/propertylistings', (req, res) => {
  pool.query('SELECT * FROM property WHERE listedBy = ?', [req.body.listedBy], (error, result) => {
    if (error || result.length === 0) return sendResponse(res, 404, 'No properties found');

    async.eachOfSeries(result, (property, i, callback) => {
      pool.query('SELECT * FROM bookings a JOIN users b ON a.bookedBy = b.email WHERE propertyID = ?', [property.uid], (err, bookings) => {
        if (err) return callback(err);
        if (bookings.length) {
          property.bookingDetails = bookings.map(b => ({
            bookingID: b.bookingID,
            bookedFrom: b.bookedFrom,
            bookedTo: b.bookedTo,
            bookedBy: `${b.firstname} ${b.lastname}`,
            noOfGuests: b.NoOfGuests,
            price: b.price
          }));
        }
        callback();
      });
    }, (err) => {
      if (err) return sendResponse(res, 400, 'Error fetching listings');
      res.status(200).json(result);
    });
  });
});

// Book Property
router.post('/bookproperty', (req, res) => {
  pool.query('INSERT INTO bookings SET ?', req.body, (error) => {
    if (error) return sendResponse(res, 400, 'Booking error');
    sendResponse(res, 200, 'Booking Added');
  });
});

// List all Trips by a Traveller
router.post('/traveller/triplistings', (req, res) => {
  pool.query('SELECT * FROM bookings a INNER JOIN property b ON a.propertyID = b.uid WHERE a.bookedBy = ?', [req.body.bookedBy], (error, result) => {
    if (error || result.length === 0) return sendResponse(res, 404, 'No trips found');
    res.status(200).json(result);
  });
});

module.exports = router;
