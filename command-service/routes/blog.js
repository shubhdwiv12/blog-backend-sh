const express = require('express');
const Blog = require('../models/Blog');  // Sequelize Blog model
const { publishEvent } = require('../services/eventPublisher');
const { protect } = require('../services/auth');
const router = express.Router();

// Add new blog (Protected)
router.post('/add', protect, async (req, res) => {
    const { blogName, category, article } = req.body;

    if (!blogName || !category || !article) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new blog entry in PostgreSQL using Sequelize
        const blog = await Blog.create({
            blogName,
            category,
            article,
            author: req.user.username,  // Assuming the user's username is stored in the JWT token
        });

        // Publish event to Kafka
        publishEvent('BLOG_CREATED', { blog });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete blog (Protected)
router.delete('/delete/:blogId', protect, async (req, res) => {
    const { blogId } = req.params;

    try {
        // Find the blog by primary key (id) and delete it
        const blog = await Blog.findOne({ where: { id: blogId, author: req.user.username } });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found or unauthorized' });
        }

        // Destroy (delete) the blog entry from PostgreSQL
        await blog.destroy();

        // Publish event to Kafka
        publishEvent('BLOG_DELETED', { blog });

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
