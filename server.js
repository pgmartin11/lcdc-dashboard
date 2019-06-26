const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const app = express(),
	port = 3000;

let url = 'mongodb://localhost';

app.use(express.static('static'));


// called by Test component
app.get('/api/issues', (req, res) => {
  	MongoClient.connect(url, function(err, client) {
  		let db = client.db('mern-project');

 		db.collection('issues').find({}).toArray().then(issues => {
 			const metadata = { total_count: issues.length }
 			res.json({ _metadata: metadata, records: issues })
 		}).catch(error => {
 			console.log(error);
 			res.status(500).json({ message: `Internal Server Error: ${error}` });
 		});
	}); 
});

app.get('/api/children', (req, res) => {
  	MongoClient.connect(url, function(err, client) {
  		let db = client.db('mern-project');

  		filter = buildIdFilter(req);

 		db.collection('children').find(filter).toArray().then(children => {
 			const metadata = { total_count: children.length }
 			res.json({ _metadata: metadata, records: children })
 		}).catch(error => {
 			console.log(error);
 			res.status(500).json({ message: `Internal Server Error: ${error}` });
 		});
	}); 
});

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

//app.get('/api/videos/:videoId', (req, res) => {
//app.get('/api/videos/(:videoId)*', (req, res) => {
/*
  	MongoClient.connect(url, function(err, client) {
  		let db = client.db('mern-project');

 		db.collection('videos').find({}).toArray().then(videos => {
 			const metadata = { total_count: videos.length }
 			res.json({ _metadata: metadata, records: videos })
 		}).catch(error => {
 			console.log(error);
 			res.status(500).json({ message: `Internal Server Error: ${error}` });
 		});
	}); 
});
 */

app.get('/api/videos', (req, res) => {
	let filter = buildIdFilter(req);

  	MongoClient.connect(url, function(err, client) {
  		let db = client.db('mern-project');

 		db.collection('videos').find(filter).toArray().then(videos => {
 			db.collection('children').find(filter).toArray().then(children => {
 				let videoId_childId = {}
				
				children.forEach(child => {
					child.videos.forEach(video_id => {
						if (!videoId_childId[video_id]) {
							videoId_childId[video_id] = [];
						}
						videoId_childId[video_id].push(child._id)
					})
				})

	 			const metadata = { 
	 				total_count: videos.length,
	 				video_child: videoId_childId
	 			}
	 			res.json({ _metadata: metadata, records: videos })
	 		}).catch(error => {
	 			console.log(error);
	 			res.status(500).json({ message: `Internal Server Error: ${error}` });
	 		});
 		}).catch(error => {
 			console.log(error);
 			res.status(500).json({ message: `Internal Server Error: ${error}` });
 		});
	}); 
});


app.listen(port, () => {
	console.log(`App started on port ${port}!`)
})


/*** utility functions - put in separate module? ***/
function buildIdFilter(req) {
	let filter = {};

	if (req.query.id) {
		let id_list = req.query.id instanceof Array ? req.query.id : [req.query.id],
			valid_ids = id_list.filter(el => ObjectId.isValid(el));

		if (valid_ids.length){
			filter._id = {$in: valid_ids.map(el => ObjectId(el))};			
		}
	}

	return filter;
}