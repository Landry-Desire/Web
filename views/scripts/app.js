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


angular
  .module('webProject', [
    'ngRoute',
    'ngCookies',
    'Login',
    'Signup'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
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
            console.log('page refresh ',$cookies.globals.currentUser.id);
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);