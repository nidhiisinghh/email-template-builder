const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const authRoutes = require('./routes/authRoutes');
const templateRoutes = require('./routes/templateRoutes');
const prebuiltRoutes = require('./routes/prebuiltRoutes');
const shareRoutes = require('./routes/shareRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://email-template-builder-orpin.vercel.app",
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/templify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/prebuilt', prebuiltRoutes);
app.use('/api/share', shareRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});