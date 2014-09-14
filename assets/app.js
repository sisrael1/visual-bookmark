var app = angular.module('Main', []);

app.controller('MainController', [ '$scope', 'crudService', function ($scope, crudService) {
	$scope.txt;

	$scope.getTxt = function () {
		crudService.read('/hello/world!')
		.then(function (data) {
			$scope.txt = data;
		});
	};

	$scope.getTxt();
}]);