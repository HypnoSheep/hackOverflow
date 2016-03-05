var postController = require('./postController.js');
var Post       = require('./postModel.js');
var Answer    = require('../answers/answerModel.js');


module.exports = function (app) {
// Map logic to route parameter 'answer'
app.param('post', function (req, res, next, id) {
	var query = Post.findById(id);

	query.exec(function (err, post) {
		if (err) {
      return next(err);
    }

		if (!post) {
      return next(new Error("can't find post"));
    }

		req.post = post;
		return next();
	});
});

app.param('answer', function (req, res, next, id) {
	var query = Answer.findById(id);

	query.exec(function (err, answer) {
		if (err) {
      return next(err);
    }

		if (!answer) {
      return next(new Error("can't find answer"));
    }

		req.answer = answer;
		return next();
	});
});

  // app = postRouter injected from middleware.js
    app.get('/', postController.getPosts);
    app.post('/', postController.newPost);
    app.get('/:post', postController.getPost);
    app.put('/:post', postController.editPost);
    app.put('/:post/votes', postController.changeVote);
    app.delete('/:post', postController.deletePost);
    app.get('/:forum', postController.getPostForum);
};
