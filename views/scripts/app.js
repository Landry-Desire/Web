/*app.js*/
'use strict';

/**
 * @ngdoc overview
 * @name webProject
 * @description
 * # webProject
 *
 * Main module of the application.
 */

 angular.module('Login',['ngCookies']);
 angular.module('Signup',[]);
 angular.module('Friends',['ngCookies']);
 angular.module('Home',['ngCookies']);



 angular
 .module('webProject', [
  'ngRoute',
  'ngCookies',
  'Login',
  'Signup',
  'Home',
  'Friends'
  ])
 .controller('HeaderCtrl', ['$scope','$rootScope','$window', '$cookies', function($scope,$rootScope,$window,$cookies){

  $scope.logout = function () {
    console.log('loging out');
    $rootScope.globals = undefined;
    $cookies = null;
    console.log('logged out');
    $window.location.href="#/login"
  }

  $scope.isNotConnected = function(){
    // console.log(( $cookies.globals == undefined || $cookies.globals == {}));
    return( $cookies.globals == undefined || $cookies.globals == {});
  }

}])
 .config(function ($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl',
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl',
  })
  .when('/friends', {
    templateUrl: 'partials/friends.html',
    controller: 'FriendsCtrl',
  })
  .when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignupCtrl',
  })
  .otherwise({templateUrl: 'partials/404.html'})
})
 .run(['$rootScope', '$location', '$cookies', '$http',
  function ($rootScope, $location, $cookies) {
        // keep user logged in after page refresh
        /*$rootScope.globals = $cookies.globals || {};*/
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
          console.log('locationChanged',$location.path()!="/signup");
          if (($location.path() != "/login" && $location.path() != "/signup")) {
            console.log('/login or /signup');
            if($rootScope.globals==undefined)
              $location.path('/login');
          }
          
        });
      }]);