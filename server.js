const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const ctrlChildren = require('./controllers/children');
const ctrlVideos = require('./controllers/videos');

const app = express(),
	port = 3000;

const url = 'mongodb://localhost';

app.use(express.static('static'));

app.get('/api/children', ctrlChildren.list);

app.get('/api/videos', ctrlVideos.list);

app.listen(port, () => {
	console.log(`App started on port ${port}!`)
})