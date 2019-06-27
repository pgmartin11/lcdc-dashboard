const { MongoClient } = require('mongodb')
const { ObjectId } = require('mongodb')
const { buildIdFilter } = require('../utilities/utilities')

const url = 'mongodb://localhost';

const list = (req, res) => {
  	MongoClient.connect(url, function(err, client) {
  		let db = client.db('mern-project'),
  			filter = buildIdFilter(req);

 		db.collection('videos').find(filter).toArray().then(videos => {
 			db.collection('children').find().toArray().then(children => {
 				let videoId_childId = {},
 					childId_name = {};
				
				children.forEach(child => {
					child.videos.forEach(video_id => {
						if (!videoId_childId[video_id]) {
							videoId_childId[video_id] = [];
						}
						videoId_childId[video_id].push(child._id)
					})
					childId_name[child._id] = `${child.firstname} ${child.lastname}`;
				})

	 			const metadata = { 
	 				total_count: videos.length,
	 				video_child: videoId_childId,
	 				child_name: childId_name
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
}

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

module.exports = { list }