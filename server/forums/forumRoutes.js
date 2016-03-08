var forumController = require('./forumController');

module.exports = function (app) {
  app.get('/', forumController.getForums);
  app.post('/', forumController.newForum);
  app.delete('/:forum_id', forumController.deleteForum);
};
