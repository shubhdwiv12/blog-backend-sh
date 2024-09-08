const mongoose = require('mongoose');

const blogQuerySchema = new mongoose.Schema({
    blogName: String,
    category: String,
    article: String,
    author: String,
    postgres_id:String,
    timestamp: Date,
});

module.exports = mongoose.model('BlogQuery', blogQuerySchema);
