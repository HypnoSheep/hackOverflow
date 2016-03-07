angular.module("hackoverflow.auth", [
  "hackoverflow.services",
  "satellizer"
])

.config(function($stateProvider) {
})

.controller("AuthController",
  function($scope, $rootScope, $auth, $state, Auth) {

  $scope.authenticate = function(provider) {
    $auth.logout();
    $auth.authenticate(provider)
      .then(function(response) {
        Auth.getUser()
          .then(function(response){
            $rootScope.userProfile = {
              name: response.data.displayName,
              picture: response.data.picture
            }
          });
        $state.go("forums");
      })
      .catch(function(response) {
        console.error("Cannot connect to GitHub: ", response);
      });
  };
});
