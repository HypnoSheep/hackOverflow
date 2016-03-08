var answerController = require('./answerController.js');
var Post       = require('../posts/postModel.js');
var Answer    = require('./answerModel.js');


module.exports = function (app) {

app.param('answer', function (req, res, next, id) {
	var query = Answer.findById(id);

	query.exec(function (err, answer) {
		if (err) {
      return next(err);
    }

    if (!answer) {
      return next(new Error('can\'t find answer'));
    }

		req.answer = answer;
		return next();
	});
});
	// Map logic to route parameter 'post'
app.param('post', function (req, res, next, id) {
	var query = Post.findById(id);

	query.exec(function (err, post) {
		if (err) {
      return next(err);
    }

    if (!post) {
      return next(new Error('can\'t find post'));
    }

		req.post = post;
		return next();
	});
});

    app.get('/:post/answers', answerController.getAnswers);
    app.get('/:post/answersNumber', answerController.getNumberOfAnswers);
    app.post('/:post/answers', answerController.newAnswer);
    app.put('/:post/answers/:answer', answerController.updateAnswer);
    app.delete('/:post/answers/:answer', answerController.deleteAnswer);
};
