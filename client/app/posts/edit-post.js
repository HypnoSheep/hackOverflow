angular.module('hackoverflow.edit-post', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($stateProvider) {
})

.controller('EditPostController', function ($scope, $state, $stateParams, Posts) {
  $scope.forums = [];
  $scope.forum = 'Please choose a forum';
  $scope.post = $stateParams.post;
  $scope.author = $stateParams.author;
  $scope.postId = $scope.post._id;
  $scope.title = $scope.post.title;
  $scope.body = $scope.post.body;
  $scope.forum = $scope.post.forum;
  $scope.tags = $scope.post.tags;
  $scope.votes = $scope.post.votes;

  $scope.getForums = function getForums() {
    Posts.getForums().then(function(data) {
      $scope.forums = data.sort();
      $scope.forums.unshift('Please choose a forum');
    });
  };

  $scope.submit = function() {
    console.log($scope.post.votes);
    Posts.editPost($scope.postId, $scope.title,
      $scope.body, $scope.forum, $scope.author, new Date(), $scope.tags, $scope.votes);
    $state.go('posts', { 'forum': $scope.forum });
  };

  $scope.changeVote = function(vote){
    Posts.alterVotes(vote, $scope.votes, $scope.postId).then(function(newVotes){
      $scope.votes = newVotes;
    })
  }

  $scope.getForums();
});
