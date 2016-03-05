angular.module('hackoverflow.answers', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('AnswersController',
  function ($scope, $rootScope, $stateParams, $state, Answers,
    Posts, TimeService) {
  $scope.answers = [];
  $scope.post = $stateParams.post;
  $scope.answer = $stateParams.answer;
  $scope.newAnswerBody = '';
  $scope.theUser = $rootScope.user;
  $scope.TimeService = TimeService;
  $scope.votes = $scope.post.votes;
  $scope.postId = $scope.post._id;

  $scope.getAnswers = function getAnswers() {
    Answers.getAnswers($scope.post._id).then(function(data) {
      $scope.answers = data.data;
    });
  };

  $scope.deleteAnswer = function deleteAnswer(postId, answerId) {
    Answers.deleteAnswer(postId, answerId);
    $scope.getAnswers();
  };

  $scope.deletePost = function deletePost(postId) {
    Posts.deletePost(postId);
    $state.go('posts');
  };

  $scope.submit = function () {
    Answers.createAnswer($scope.post._id, $scope.newAnswerBody, $rootScope.user, new Date());
    $scope.newAnswerBody = '';
    $scope.getAnswers();
  };

  $scope.changeVote = function(vote) {
    Posts.alterVotes(vote, $scope.votes, $scope.postId).then(function(newVotes){
      $scope.votes = newVotes;
    })
  };

  $scope.getAnswers();
});
