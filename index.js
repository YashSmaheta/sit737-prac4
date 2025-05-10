const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

// MongoDB connection configuration from environment variables
const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const host = process.env.MONGO_HOST || "localhost";
const db = process.env.MONGO_DB || "crudDB";
const mongoUrl = `mongodb://${username}:${password}@${host}:27017/${db}?authSource=admin`

const collectionName = 'users';
const app = express();
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let client;

const connectToDb = async () => {
  try {
    client = await MongoClient.connect(mongoUrl); // No need for deprecated options
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  }
};

// ➕ Create
app.post('/api/submit', async (req, res) => {
  console.log('Request Body:', req.body); // Log the incoming data
  const { name, age } = req.body;

  if (!name || !age) {
    console.error('Missing required fields: name or age');
    return res.status(400).send({ message: 'Name and age are required.' });
  }

  try {
    const result = await client.db(db).collection(collectionName).insertOne({ name, age });
    res.status(200).send({ message: 'Data added successfully!', result });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Error inserting data', error });
  }
});

// 📖 Read
app.get('/api/data', async (req, res) => {
  try {
    const data = await client.db(db).collection(collectionName).find().toArray();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching data', error });
  }
});

// ✏️ Update
app.put('/api/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  try {
    const result = await client.db(db).collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, age } }
    );
    res.status(200).send({ message: 'Data updated', result });
  } catch (error) {
    res.status(500).send({ message: 'Error updating data', error });
  }
});

// ❌ Delete
app.delete('/api/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.db(db).collection(collectionName).deleteOne({ _id: new ObjectId(id) });
    res.status(200).send({ message: 'Data deleted', result });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting data', error });
  }
});

// Start the Express server
app.listen(port, async () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  await connectToDb();
});
