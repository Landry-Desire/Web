var app = angular.module('myApp',['ui.router'])

//using ui-router
app.config(function($stateProvider, $urlRouterProvider){   
	// For any unmatched url, send to /route1
	$urlRouterProvider.otherwise("/")

	$stateProvider
	.state('login', {
		url: "/",
		templateUrl: "partials/login",
		controller: 'loginCtrl',
	})


	.state('home', {
		url: "/home",
		templateUrl: "partials/home",
		controller: 'homeCtrl',
	})


	$stateProvider
	.state('signup', {
		url: "/signup",
		templateUrl: "partials/signup",
		controller: 'signupCtrl',
	})



	.state('dashboard', {
		url: "/dashboard",
		templateUrl: "partials/dashboard",
		controller: 'dashboardCtrl',
	})

})

