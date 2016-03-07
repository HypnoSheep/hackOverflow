angular.module("hackoverflow.forums", [
  "hackoverflow.services",
  "ui.router"
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {

})

.controller("ForumsController",
  function ($scope, $rootScope, $stateParams, $state, Posts, Answers, TimeService, ForumService) {
    $scope.forums = [];
    $scope.forum = $state.params.forum || "Select Forum..."
    $scope.forumsClass = $state.current.name === "forums" ? "middle" : "sidebar";

    $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {
      $scope.forumsClass = toState.name === "forums" ? "middle" : "sidebar";
      $scope.forum = toParams.forum || "Select Forum...";
    })

    // $scope.newForum = function newForum(forumName) {
    //   Posts.newForum(forumName).then(function () {
    //     $scope.forumName = "";
    //     $scope.getForums();
    //   });
    // };

    $scope.getForums = function getForums(forum) {
      Posts.getForums().then(function (data) {
        $scope.forums = data.sort();
      });
    };
    $scope.getForums();
  }
);
