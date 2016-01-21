
'use strict';

angular.module('Profile')
.controller('ProfileCtrl', ['$scope','$cookies' ,
	function ($scope,$cookies ) {
		
		alert(JSON.parse($cookies.get("globals")).currentUser)
		$scope.me = JSON.parse($cookies.get("globals")).currentUser
    
	/*	$scope.getMe = function(){
			$http.get('/users/')
			.success(function(r){
				$scope.me = r;
			})
			.error(function(r){
				console.log('error',r);
			})
		}
		*/

	}])