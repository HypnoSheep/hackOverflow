angular.module('hackoverflow.posts', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('PostsController', function ($scope, $stateParams, $state, Posts, Answers, TimeService, ForumService) {
  $scope.posts = [];
  //$scope.postId =  $scope.post._id;
  $scope.forums = [];
  $scope.numberOfAnswers = {};
  $scope.forum = ForumService.currentForum.model.forum;
  $scope.TimeService = TimeService;
  $scope.forumName = '';
  
  $scope.getPosts = function getPosts(forum) {
    // TODO: need to pass in forum to Posts.getPosts()
    Posts.getPosts('').then(function (data) {
      $scope.posts = data.data;
      // this creates an object $scope.numberOfAnswers that
      // keeps track of each posts number of Answers. not
      // ideal, but works. need to refactor how we go
      // about determining the number of Answers.
      for (var i = 0; i < $scope.posts.length; i++) {
        $scope.posts[i].numberOfAnswers = $scope.getNumberOfAnswers($scope.posts[i]._id);
      }
    });
  };

  $scope.getForums = function getForums(data) {
    Posts.getForums().then(function (data) {
      $scope.forums = data.sort();
    });
  };

  $scope.newForum = function newForum(forumName) {
    Posts.newForum(forumName).then(function () {
      $scope.forumName = '';
      $scope.getForums();
    });
  };

  $scope.switchForum = function switchForum(forum) {
    $scope.forum = forum;
    ForumService.currentForum.model.forum = forum;
    $scope.getForums();
  };

  $scope.getNumberOfAnswers = function getNumberOfAnswers(postId) {
    Answers.getNumberOfAnswers(postId).then(function (data) {
      $scope.numberOfAnswers[postId] = data.data;
    });
  };

  $scope.getPosts($scope.forum);
  $scope.getForums();
});
