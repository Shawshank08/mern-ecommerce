require('dotenv').config();
const express = require('express');

const app = express();

// test route
app.get('/', (req, res) => {
  res.send('Server is running in dev mode');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
