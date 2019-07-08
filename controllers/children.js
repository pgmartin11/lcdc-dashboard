const { MongoClient } = require('mongodb')
const { ObjectId } = require('mongodb')
const { buildIdFilter } = require('../utilities/utilities')

const url = 'mongodb://localhost';

const list = (req, res) => {
  	MongoClient.connect(url, function(err, client) {
  		let db = client.db('mern-project'),
			filter = buildIdFilter(req),
			ageFilter = {},
			umveltFilter = {};

			if (req.query.age_lower || req.query.age_upper) {
				ageFilter.age = {};				
			}
			if (req.query.age_lower) {
				ageFilter.age.$gte = parseInt(req.query.age_lower, 10);	
			}
			if (req.query.age_upper) {
				ageFilter.age.$lte = parseInt(req.query.age_upper, 10);
			}

			if (req.query.hasUmvelt) {
				umveltFilter.has_umvelt = req.query.hasUmvelt.toLowerCase() == 'true';
			}

			if (Object.keys(ageFilter).length) {
				filter = Object.assign(filter, ageFilter);	
			}

			if (Object.keys(umveltFilter).length) {
				filter = Object.assign(filter, umveltFilter);
			}

 		db.collection('children').find(filter).toArray().then(children => {
 			db.collection('videos').find().toArray().then(videos => {
 				let vId_vName = {}

 				videos.forEach(video => {
 					vId_vName[video._id] = video.title;
 				})

	 			const metadata = { 
	 				total_count: children.length,
	 				video_name: vId_vName
	 			}
	 			res.json({ _metadata: metadata, records: children })
	 		}).catch(error => {
	 			console.log(error);
	 			res.status(500).json({ message: `Internal Server Error: ${error}` });
	 		});
 		}).catch(error => {
 			console.log(error);
 			res.status(500).json({ message: `Internal Server Error: ${error}` });
 		});
	}); 
}

const items =  (req, res) => {
  	MongoClient.connect(url, function(err, client) {
  		let db = client.db('mern-project');

 		db.collection('children').find().toArray().then(children => {
 			const metadata = { 
 				total_count: children.length,
 			}
 			res.json({ _metadata: metadata, list: children })
 		}).catch(error => {
 			console.log(error);
 			res.status(500).json({ message: `Internal Server Error: ${error}` });
 		});
	}); 
}

/*
 * these next 2 are correct

app.get('/api/children/:childId', (req, res) => {
  	MongoClient.connect(url, function(err, client) {
  		let db = client.db('mern-project');

 		db.collection('children').find({_id:ObjectId(req.params.childId)}).toArray().then(children => {
 			const metadata = { total_count: children.length }
 			res.json({ _metadata: metadata, records: children })
 		}).catch(error => {
 			console.log(error);
 			res.status(500).json({ message: `Internal Server Error: ${error}` });
 		});
	}); 
});

app.get('/api/children/videos/:videoId', (req, res) => {
  	MongoClient.connect(url, function(err, client) {
  		let db = client.db('mern-project');

 		db.collection('children').find({}).toArray().then(children => {
 			const metadata = { total_count: children.length }
 			res.json({ _metadata: metadata, records: children })
 		}).catch(error => {
 			console.log(error);
 			res.status(500).json({ message: `Internal Server Error: ${error}` });
 		});
	}); 
});
*/

module.exports = { list, items }