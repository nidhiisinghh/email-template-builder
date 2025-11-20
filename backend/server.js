const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './.env' });

// Import routes
const authRoutes = require('./routes/authRoutes');
const templateRoutes = require('./routes/templateRoutes');
const prebuiltRoutes = require('./routes/prebuiltRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/emailbuilder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/prebuilt', prebuiltRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});