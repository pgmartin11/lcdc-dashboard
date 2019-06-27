const { MongoClient } = require('mongodb')
const { ObjectId } = require('mongodb')

const buildIdFilter = (req) => {
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

module.exports = { buildIdFilter }