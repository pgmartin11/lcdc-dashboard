const express = require('express');
const router = express.Router();

const ctrlChildren = require('../controllers/children');
const ctrlVideos = require('../controllers/videos');


//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now());
  next();
});

router.get('/api/children', ctrlChildren.list);

router.get('/api/children/items', ctrlChildren.items);

router.get('/api/videos', ctrlVideos.list);

router.get('/api/videos/items', ctrlVideos.items);

module.exports = router;