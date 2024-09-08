const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./Middleware')
const User = require('./userModel.js');

function isAlphanumeric(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
}
// Register User
// User Registration Route with Validation
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'All fields are mandatory' });
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: 'Invalid email format, must contain "@" and ".com"' });
    }
    console.log("check alphanumeric", password, isAlphanumeric(password))
    // Check if password is at least 8 characters and alphanumeric
    if (password.length < 8 || !isAlphanumeric(password)) {
      return res.status(400).json({ msg: 'Password must be at least 8 characters and alphanumeric' });
    }
  
    try {
      let user = await User.findOne({ email });
      if (user) {
        user= await User.findOne({username});
        if(user){
          return res.status(400).json({ msg: 'User already exists' });
        }
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({ username, email, password });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message,msg:"Server Error"  });
    }
  });

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, msg:"Login Successful!!" });
  } catch (err) {
    
    res.status(500).send('Server error', err.message);
  }
});

router.get('/getUserData', auth,async (req, res) => {
  try {
    
    const user = await User.findOne({ _id: req.body.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({username:user.username, email:user.email});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
