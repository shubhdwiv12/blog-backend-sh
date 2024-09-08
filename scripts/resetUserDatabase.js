// scripts/resetQueryDatabase.js
const { MongoClient } = require('mongodb');

const resetQueryDatabase = async () => {
  const client = new MongoClient('mongodb+srv://shubh:djG8IhEtGPXk4dpR@cluster0.fui8u.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0', { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('users');  // Database name for Query Service
    await db.collection('users').deleteOne({email:"testuser@example.com"});  // Clear all data in the collection
    console.log('Query database reset successfully');
  } catch (err) {
    console.error('Error resetting Query database:', err);
  } finally {
    await client.close();
  }
};

resetQueryDatabase();
