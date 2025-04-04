var mysql = require('mysql');
var express = require('express');
var router = express.Router();

// Search Property Endpoint for JMeter Testing
router.post('/property/search', function (req, res) {
  console.log('Search Request:', req.body);
  const { startDate, endDate, city, noOfGuests } = req.body;

  const query = `
    SELECT * FROM property
    WHERE uid NOT IN (
      SELECT propertyID FROM bookings
      WHERE (? BETWEEN bookedFrom AND bookedTo OR ? BETWEEN bookedFrom AND bookedTo)
    )
    AND city = ? AND startDate <= ? AND endDate >= ? AND sleeps >= ?`;

  con.query(query, [startDate, endDate, city.toLowerCase(), startDate, endDate, noOfGuests], (error, result) => {
    if (error) {
      console.error('Error fetching properties:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length === 0) {
      console.log('No Properties Found');
      return res.status(404).json({ message: 'No Properties Found' });
    }

    console.log('Properties Found:', result);
    res.status(200).json(result);
  });
});

module.exports = router;
