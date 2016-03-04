var Forum = require ('./forumModel');

module.exports = {
  getForums: function (req, res, next) {
    Forum.find(function(err, forums) {
      if (err) {
        return next(err);
      }

      res.json(forums);
    });
  }, 

  newForum: function (req, res, next) {
    var forum = new Forum(req.body);
    forum.name = req.body.name;

    forum.save(function(err, forum) {
      if (err) {
        return next(err);
      }

      res.json(forum);
    });
  }, 

  deleteForum: function (req, res, next) {
    Forum.remove({
      name: req.params.forum
    }, function(err, forum) {
      if (err) {
        return next(err);
      }
      res.json('deleted', forum);
    });
  }

};