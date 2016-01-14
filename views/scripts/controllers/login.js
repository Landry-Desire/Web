'use strict';

angular.module('Login')
  .controller('LoginCtrl', ['$scope', '$window', 'LoginService', function ($scope, $window, LoginService) {
    $scope.email = "psow";
    $scope.pwd = "passer33";
    $scope.signin = function(){
    	LoginService.login($scope.email,$scope.pwd,function(response){
    		$window.location.href="#/home"
    	});
    }
  }])
  .factory('LoginService',['$http','$rootScope' ,'$cookies'
  	,function($http, $rootScope,$cookies){
  		var service = {};
  		service.login = function(email, pwd, cb){
  			$http.post('/users/login/',{
  				"pseudo": email,
  				"password":pwd
  			}).success(function(response){
  				service.setSession(email)
  				cb(response);
  			}).error(function(response){
  				cb(response);
  			});
  		}
  		service.setSession = function(user){
  			$rootScope.globals = {
                currentUser: user
            };
            $cookies.globals = $rootScope.globals;
            
  		}
  		service.destroySession = function(){
  			$rootScope.globals= {}
  			$cookieStore.remove('globals');
  		}
  		
  		return service;

  }]);


