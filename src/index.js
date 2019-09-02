require('dotenv').config();
const express = require('express');
const database = require('./database');
const passport = require('passport');
const authRoutes = require('./routes/auth.routes');

require('./passport');

const app = express();
database();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.get('/', (req, res) => {
  res.send('Ready');
});

app.use('/auth', authRoutes);

// Status 404 handler
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listener
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
