// Libraries
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const pool = require('./src/models/UserDB');

// App Configuration
const app = express();
const port = 3000;
const basePath = '/rentanevent';

// Session Configuration
app.use(session({
  secret: 'rentanevent_secret',
  resave: false,
  saveUninitialized: false,
}));

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(bodyParser.json());

// Database Connection Test
pool.query('SELECT 1', (err) => {
  if (err) console.error('Database connection failed:', err);
  else console.log('Connected to the database.');
});


// Routes
const loginRoutes = require('./src/routes/loginRoutes');
const propertyRoutes = require('./src/routes/propertyRoutes');
const propertySearch = require('./src/routes/propertysearchwithoutpooling');

app.use(basePath, loginRoutes);
app.use(basePath, propertyRoutes);
app.use(basePath, propertySearch);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Start Server
app.listen(port, () => {
  console.log(`RentAnEvent Backend running on http://localhost:${port}`);
});
