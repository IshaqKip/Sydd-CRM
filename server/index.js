const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/sydd-crm', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ['customer', 'admin'] },
});
const User = mongoose.model('User', UserSchema);

// Query Schema
const QuerySchema = new mongoose.Schema({
  query: String,
  date: { type: Date, default: Date.now },
});
const Query = mongoose.model('Query', QuerySchema);

// Authentication Middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Routes
app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role });
  await user.save();
  res.send('User registered');
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).send('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, 'secret');
  res.json({ token });
});

app.post('/api/queries', auth, async (req, res) => {
  const { query } = req.body;
  const newQuery = new Query({ query });
  await newQuery.save();
  res.send('Query saved');
});

app.post('/api/upload', auth, upload.single('file'), (req, res) => {
  res.send('File uploaded');
});

app.listen(5000, () => console.log('Server running on port 5000'));