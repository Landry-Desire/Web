app.controller("loginCtrl",['$scope','$http','$location','Authorization', function($scope,$http,$location,Authorization) {
	//alert("ds le controller login");

	$scope.submitLogin= function() {
		var params =JSON.stringify( { pseudo: $scope.pseudo, password :$scope.password})
		$http.post('http://localhost:3000/users/login',params)
		.success(function(status) {
			console.log(JSON.stringify(status))
			if(status.success==true){
				Authorization.go('home');
				//$location.url('/home');

			} else if(status.message == "User not found"){
				alert(JSON.stringify(status.message)+", please sign up!")
				$location.url('/signup');
			} else {
				alert("Sign in failed ")
			} 
		}
		)
		.error(function(status) {
			console.log(status);
		});
	};
}]);



app.controller("signupCtrl",['$scope','$http','$location', function($scope,$http,$location) {
	//alert("ds le controller signup")

	$scope.submitSignup= function() {
		var params =JSON.stringify( { pseudo: $scope.pseudo, password :$scope.password})
		
		$http.post('http://localhost:3000/users/signup',params)
		.success(function(user) {
			if(user.message == "user already exists") {
				alert("user already exists , please sign in !")
				$location.url('/login');
			} else {
				$location.url('/home');
				$scope.userloggedin = user;
				console.log(JSON.stringify(user))
			}
			
		})
		.error(function(status) {
			console.log(status);
		});
	};

}]);



app.controller("homeCtrl",['$scope','$http', function($scope,$http) {
	//alert("ds le controller home")
}]);