db.children.updateOne({_id:ObjectId("5cf8794ed8869e4c47e4a044")}, {$set:{videos:["5d0690c6866c4f818f835742"]}})

db.children.updateOne({_id:ObjectId("5d0690c6866c4f818f835747")}, {$set:{videos:["5d0690c6866c4f818f835743","5d0690c6866c4f818f835744"]}})

db.videos.find({_id:{$in:[ObjectId("5cf7230ff5a2fbfaff8db6b4"),ObjectId("5cf7230ff5a2fbfaff8db6b6")]}}).pretty()

db.videos.findOne({_id:ObjectId("5cf7230ff5a2fbfaff8db6b6")},{_id:1})

db.videos.find({_id:ObjectId("5cf7230ff5a2fbfaff8db6b6")},{_id:1}).valueOf();

db.children.find({_id:{$in:[ObjectId("5d0690c6866c4f818f835747"),ObjectId("5d0690c6866c4f818f835746")]}}).pretty()