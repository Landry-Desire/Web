var app=angular.module('myApp');

app.controller("connexionCtrl",['$scope','$http','$location', function($scope,$http,$location) {
    
    alert("ds le controller")
    
	$scope.submitLogin= function() {
		var params =JSON.stringify( { email: $scope.pseudo, password :$scope.password})
		alert($scope.pseudo,$scope.password)
		$http.post('http://localhost:3000/users/login',params)
		.success(function(user) {
			    //alert(JSON.stringify(user.pseudo))
                $scope.userloggedin = user;
				$location.url('/dashboard');
			}
		)
		.error(function(status) {
			console.log(status);
		});
	};
}]);