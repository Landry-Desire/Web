'use strict';

angular.module('Login')
  .controller('LoginCtrl', ['$scope', '$window', 'LoginService', function ($scope, $window, LoginService) {
    $scope.email = "psow";
    $scope.pwd = "passer33";
    $scope.login = function(){
    	LoginService.login($scope.email,$scope.pwd,function(response){
        console.log($scope.email,$scope.pwd);
        if(response.success){
          console.log(response.message);
          $window.location.href="#/home"
        }else{
          alert(response.message);
          console.log(response.message);
        }
          
    	});
    }
  }])
  .factory('LoginService',['$http','$rootScope' ,'$cookies','$cookieStore'
  	,function($http, $rootScope,$cookies, $cookieStore){
  		var service = {};
  		service.login = function(email, pwd, cb){
        console.log(email,pwd);
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
            $cookies.put("globals",$rootScope.globals)
            $cookieStore.put("globals",$rootScope.globals)
            $cookies.globals = $rootScope.globals;
            
  		}
  		service.destroySession = function(){
  			$rootScope.globals= {}
  			$cookies.remove('globals');
  			$cookieStore.remove('globals');
  		}
  		
  		return service;

  }]);


