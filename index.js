const express = require('express');
// const app = express();
// require("dotenv").config();
// const PORT = 5050;
// const cors = require("cors");
// app.use(cors());
// // const PORT = process.env.PORT || 5050;
// app.get('/', (req, res) => {
//     res.send('Welcome to my API');
//   });
// const podcasterRoutes = require('./routes/routes');

// // all users routes
// app.use('/podcasters', podcasterRoutes);

// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server is running on http://0.0.0.0:${PORT}`);
// });

const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());

// Use APP_PORT for your API server or default to 5050
const APP_PORT = process.env.APP_PORT || 5050;

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

const podcasterRoutes = require('./routes/routes');

// All users routes
app.use('/podcasters', podcasterRoutes);

// Use APP_PORT for the server
app.listen(APP_PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${APP_PORT}`);
});
