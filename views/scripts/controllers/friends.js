'use strict';

angular.module('Friends')
  .controller('FriendsCtrl', ['$scope', '$rootScope', '$http', '$cookies' ,
  	function ($scope, $rootScope,  $http, $cookies ) {
	    $scope.me = {};
	    $scope.allUsers = [];
	    $scope.u = "";
	    $scope.addFriend=function () {
	    	var u = angular.copy($scope.me);
	    	u.friends.push($scope.u);
	    	$http.post('/friends/add',{"pseudo":$scope.u})
	    	.success(function (r) {
	    		console.log('Friend added',r);
	    		$scope.getMe();
	    	}).error(function (r) {
	    		console.log('Friend not added',r);
	    	})
	    }
	    $scope.getMe = function(){
	    	$http.get('/users/')
	    	.success(function(r){
	    		$scope.me = r;
	    	})
	    	.error(function(r){
	    		console.log('error',r);
	    	})
	    }
	    $scope.getAllUsers = function(){
	    	$http.get('/users/all')
	    	.success(function(r){
	    		for(var i in r){
	    			if(r[i].pseudo==JSON.parse($cookies.get("globals")).currentUser)
	    				r.splice(i,1);		
	    		}
	    		$scope.allUsers = r;
	    	})
	    	.error(function(r){
	    		return r;
	    	})
	    }
	    $scope.in = function(){
	    	for(var u in $scope.allUsers){
	    		if($scope.allUsers[u].pseudo == $scope.u){
	    			if($scope.me.friends.indexOf($scope.u)==-1)
	    			    return false;
	    		}
	    	}
	    	return true;
	    }
	   
	    $scope.getAllUsers();
	    $scope.getMe();
  	}
  ]);