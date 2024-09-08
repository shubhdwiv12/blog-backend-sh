const express = require('express');
const BlogQuery = require('../models/BlogQuery');
const { protect } = require('../services/auth');
const router = express.Router();

// Fetch blogs by category
router.get('/info/:category',protect ,async (req, res) => {
    try {
        const blogs = await BlogQuery.find({ category: req.params.category });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Fetch All Blogs
router.get('/Allblogs', protect, async (req, res) => {
    try {
      const blogs = await BlogQuery.find({ author: req.user.username });
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

// GET: Fetch blogs by category and date range (protected route)
router.get('/blogs/:category/:durationFromRange/:durationToRange', protect, async(req, res) => {
    try {
      const { category, durationFromRange, durationToRange } = req.params;
      const blogs = await BlogQuery.find({
        category,
        createdAt: { $gte: new Date(durationFromRange), $lte: new Date(durationToRange) }
      });
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });
module.exports = router;
