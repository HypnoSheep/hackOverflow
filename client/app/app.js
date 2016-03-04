angular.module('hackoverflow', [
  'hackoverflow.services',
  'hackoverflow.forums',
  'hackoverflow.posts',
  'hackoverflow.add-post',
  'hackoverflow.edit-post',
  'hackoverflow.answers',
  'ui.router',
  'ngRoute',
  'ngSanitize',
  'ngTagsInput',
  'satellizer',
  'hackoverflow.auth'
])

.run(function($rootScope, $auth) {

  $rootScope.$on("$routeChangeStart",
    function (event, next, current) {

    if (sessionStorage.restorestate == "true") {

      //let everything know we need to restore state
      $rootScope.$broadcast('restorestate');
      sessionStorage.restorestate = false;
    }
  });

  //let everthing know that we need to save state now.
  window.onbeforeunload = function (event) {
    $rootScope.$broadcast('savestate');
  };
})

.controller('AppController', function($scope, $location, $auth) {

  // this ensures that application fully reboots and
  // defaults to main page if user reloads a page.
  // $location.path("/");
})

.config(function($httpProvider, $urlRouterProvider,
  $stateProvider, $locationProvider, $authProvider) {

  $authProvider.github({
    clientId: 'b09b1334afed657344e5'
  });

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('signin');
  $stateProvider
    .state('forums', {
      url: '/forums',
      templateUrl: 'app/forums/forums.html',
      controller: 'ForumsController'
    })
      .state('forums.posts', {
        url: '/:forum',
        templateUrl: 'app/posts/posts.html',
        controller: 'PostsController'
      })
    .state('add-post', {
      url: '/add-post',
      templateUrl: 'app/posts/add-post.html',
      controller: 'AddPostController'
    })
    .state('edit-post', {
      params: {'post': null},
      url: '/edit-post',
      templateUrl: 'app/posts/add-post.html',
      controller: 'EditPostController'
    })
    .state('answers', {
      params: {'post': null},
      url: '/answers',
      templateUrl: 'app/answers/answers.html',
      controller: 'AnswersController'
    })
    .state('signin', {
      url: '/',
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    });
});
