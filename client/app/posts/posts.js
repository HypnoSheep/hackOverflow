angular.module('hackoverflow.posts', [
  'hackoverflow.services',
  'ui.router',
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('PostsController', function ($scope, $stateParams, $state, Posts, Answers, TimeService, ForumService) {
  $scope.posts = [];
  $scope.numberOfAnswers = {};
  $scope.TimeService = TimeService;

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

  $scope.getNumberOfAnswers = function getNumberOfAnswers(postId) {
    Answers.getNumberOfAnswers(postId).then(function (data) {
      $scope.numberOfAnswers[postId] = data.data;
    });
  };
  
  $scope.getPosts($stateParams.forum);
});
