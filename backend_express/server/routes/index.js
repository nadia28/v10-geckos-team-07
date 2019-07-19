const express = require('express');
const path = require('path');
const UserService = require('../services/UserService');
const RoomService = require('../services/RoomService');
const CommentService = require('../services/CommentService');

const router = express.Router();
const usersRouter = require('./users');
const roomsRouter = require('./rooms');
const commentsRouter = require('./comments');

module.exports = () => {
  const userService = new UserService(path.join(__dirname, '../data/users.json'));
  const roomService = new RoomService(path.join(__dirname, '../data/rooms.json'));
  const commentService = new CommentService(path.join(__dirname, '../data/comments.json'));


router.get('/', function(req, res, next){
  return res.render('index');
});

router.use('/users', usersRouter(userService));
router.use('/rooms', roomsRouter(roomService));
router.use('/comments', commentsRouter(commentService));

  return router;
}