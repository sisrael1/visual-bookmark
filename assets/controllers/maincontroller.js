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