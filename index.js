const express = require('express');
const app = express();
require("dotenv").config();
const PORT = 8080;
const cors = require("cors");
app.use(cors());
// const PORT = process.env.PORT || 5050;
app.get('/', (req, res) => {
    res.send('Welcome to my API');
  });
const podcasterRoutes = require('./routes/routes');

// all users routes
app.use('/podcasters', podcasterRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});