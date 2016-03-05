var Post       = require('./postModel.js');
var Answer    = require('../answers/answerModel.js');

module.exports = {
  // gets all posts
  getPosts: function (req, res, next) {
    Post.find(function (err, posts) {
    if (err) {
      return next(err);
    }

    res.json(posts);
   });
 },

  // gets a single post
  getPost: function (req, res) {
    req.post.populate('answer', function (err, post) {
      res.json(post);
   });
 },

  // creates a new post
  newPost: function (request, response, next) {
    var post = new Post(request.body);
    post.title = request.body.title;
    post.author = request.body.author;
    post.body = request.body.body;
    post.tags = request.body.tags;
    post.votes = request.body.votes;
    console.log(request.body.votes);
    console.log('post tags', post.tags);
    post.save(function(err, post) {
     if(err) {
      return next(err);
    }
    console.log('post', post);
     response.json(post);
   });
 },

  editPost: function (request, response) {
    Post.findOne({ _id: request.params.post }, function (err, post){
      console.log('postController line 44 ', request.body)
      if (err){
        return response.send(err);
      }

      for (var prop in request.body) {
        console.log('prop ', prop);
        console.log('post[prop] ', post[prop]);
        post[prop] = request.body[prop];
      }

      post.save(function (err) {
        if (err) {
          return response.send(err);
        }

        response.json({ message: 'Post updated!'});
      });
    });

  },

  changeVote: function(request, response){
    Post.findOne({_id:request.params.post}, function(err, post){
      if (err) {
        return response.send(err);
      }

      for (var prop in request.body) {
        if(prop === 'votes'){
          post[prop] = request.body[prop]
        }
      }
      post.save(function (err) {
        if(err) {
          return response.send(err);
        }
        response.json({ message: 'Post updated!'});
      })
    });
  },
  
  // deletes post and it answer children
  deletePost: function (request, response, next) {
   request.post.answers.forEach(function (id) {
    Answer.remove({
      _id: id
     }, function (err) {
      if (err) {
        return next(err);
      }
     });
   });

   Post.remove({
    _id: request.params.post
   }, function (err, post) {
     if (err) {
      return next(err);
     }

    // get and return all the posts after you delete one
    Post.find(function (err, posts) {
      if ( err ) {
        return next( err );
      }

      response.json( posts );
    });
   });
 },

 getPostForum: function (request, response, next) {
  Post.find({}).select({ forum: request.body.post.forum })
 }

};
