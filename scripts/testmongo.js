//import { MongoClient } from 'mongodb'
//const MongoClient = require('mongodb').MongoClient;
//const MongoClient = require('mongodb');

/*
MongoClient.connect('mongodb://localhost/people', function(err, db) {
	db.collection('employees').find().toArray(function(err, docs) {
		console.log('Result of find', docs);
		db.close();
	});
});
 */

var db = new Mongo().getDB('mern-project');

/* 
 *  issues 
 */
db.issues.remove({});

db.issues.insert([
	{
		status: 'Open',
		owner: 'Peter'
	},
	{
		status: 'Closed',
		owner: 'Ethan'
	},
	{
		status: 'Pending',
		owner: 'Fran'
	}
]);

db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });

/* 
 *  videos 
 */
db.videos.remove({});

db.videos.insert([
	{
		title: 'Video One',
		category: 'Instructional',
		subcategory: 'Umvelt',
		requires_subscription: false,
		viewable_password: true,
		viewing_duration: 45.35,
		description: 'Lesson One',
		is_featured: false,
		is_hidden: false,
		login_to_view: false
	},
	{
		title: 'Video Two',
		category: 'Recreational',
		subcategory: '',
		requires_subscription: false,
		viewable_password: false,
		viewing_duration: 60.35,
		description: 'Lesson Two',
		is_featured: true,
		is_hidden: false,
		login_to_view: false
	},
	{
		title: 'Video Three',
		category: 'Improvisational',
		subcategory: 'Umvelt',
		requires_subscription: false,
		viewable_password: true,
		viewing_duration: 80.45,
		description: 'Lesson Three',
		is_featured: false,
		is_hidden: true,
		login_to_view: true
	}
]);

//db.issues.createIndex({ status: 1 });
//db.issues.createIndex({ owner: 1 });



/*
 * children
 *
 */
 db.children.remove({});

 db.children.insert([
	{
		firstname: 'Willy',
		lastname: 'Wonka',
		alias: 'LittleW',
		age: 10,
		videos: [],
		has_umvelt: false,
		info: {}
	},
	{
		firstname: 'Duran',
		lastname: 'Duran',
		alias: 'DD',
		age: 25,
		videos: [],
		has_umvelt: false,
		info: {}
	},
	{
		firstname: 'Marcus',
		lastname: 'Miller',
		alias: 'MrBass',
		age: 45,
		videos: [],
		has_umvelt: true,
		info: {}
	}
]);


