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
        $rootScope.globals = $cookies.globals || {};
        console.log($rootScope.globals);
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
        	if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
        		$location.path('/login');
        	}
        });
    }]);