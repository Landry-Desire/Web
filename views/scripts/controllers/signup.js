'use strict';

angular.module('Signup')
  .controller('SignupCtrl', ['$scope','$http', '$location' ,function ($scope,$http,$location) {
    $scope.email = "psow";
    $scope.pwd = "passer33";
    $scope.confpwd= "passer33"
    $scope.signup = function(){
        console.log('signup');
        var cb = function(r){
            alert(r);
            $location.path('/login');
        }
    	if($scope.pwd != $scope.confpwd){
            cb("error pwd");
            return;
        }
    $http.post('/users/signup',{
            "pseudo": $scope.email,
            "password": $scope.pwd
        }).success(function(response){
            console.log('success ',response);
            cb("Signup Effectué");
        }).error(function(response){
            console.log('failed ',response);
            cb("Signup Echoué");
        });
    }
  }]);