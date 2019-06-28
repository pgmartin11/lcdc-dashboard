const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const app = express(),
	port = 3000;

const url = 'mongodb://localhost';

app.use(express.static('public'));

// routes
app.use(require('./routes/routes'));

app.listen(port, () => {
	console.log(`App started on port ${port}!`)
})