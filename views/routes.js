var app = angular.module('myApp',['ui.router'])

//using ui-router
app.config(function($stateProvider, $urlRouterProvider){   
	// For any unmatched url, send to /route1
	$urlRouterProvider.otherwise("/dashboard")

	$stateProvider
	.state('connexion', {
		url: "/",
		templateUrl: "index.html",
		controller: 'connexionCtrl',
	})



	.state('dashboard', {
		url: "/dashboard",
		templateUrl: "partials/dashboard.html",
		controller: 'dashboardCtrl',
	})

]})

