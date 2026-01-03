require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware')
const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
connectDB();
app.get('/api/profile', protect, (req, res) => {
  res.json(req.user);
})
app.get('/', (req, res) => {
  res.send('Backend running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
