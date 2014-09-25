var app = angular.module('Main', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'assets/views/index.html',
			controller: 'MainController',
			title: 'Home'
		})
		.when('/product', {
			templateUrl: 'assets/views/product.html',
			controller: 'MainController',
			title: 'Home'
		})
		.when('/dashboard', {
			templateUrl: 'assets/views/dashboard.html',
			controller: 'MainController',
			title: 'Dashboard'
		})
		.when('/settings', {
			templateUrl: 'assets/views/settings.html',
			controller: 'MainController',
			title: 'Settings'
		})
		.when('/help', {
			templateUrl: 'assets/views/help.html',
			controller: 'MainController',
			title: 'Help'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);