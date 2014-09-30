var app = angular.module('Main', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'assets/views/index.html',
			controller: 'MainController',
			title: 'Home',
			id: 1
		})
		.when('/product', {
			templateUrl: 'assets/views/product.html',
			controller: 'MainController',
			title: 'Product',
			id: 2
		})
		.when('/dashboard', {
			templateUrl: 'assets/views/dashboard.html',
			controller: 'DashboardController',
			title: 'Dashboard',
			id: 3
		})
		.when('/settings', {
			templateUrl: 'assets/views/settings.html',
			controller: 'MainController',
			title: 'Settings',
			id: 4
		})
		.when('/help', {
			templateUrl: 'assets/views/help.html',
			controller: 'MainController',
			title: 'Help',
			id: 5
		})
		.otherwise({
			redirectTo: '/'
		});
}]);