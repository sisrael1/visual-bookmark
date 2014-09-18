var app = angular.module('Main', ['ngRoute']);

app.controller('MainController', ['$rootScope','$scope', '$route', 'crudService', function ($rootScope, $scope, $route, crudService) {
	$scope.txt;

	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		$rootScope.title = $route.current.title;
		console.log($route);
	});

	$scope.getTxt = function () {
		crudService.read('/hello/world!')
		.then(function (data) {
			$scope.txt = data;
		});
	};

	$scope.getTxt();
}]);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'assets/views/index.html',
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
		.when('/product', {
			templateUrl: 'assets/views/product.html',
			controller: 'MainController',
			title: 'Product'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);