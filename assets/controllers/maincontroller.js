app.controller('MainController', ['$rootScope','$scope', '$route', '$location', 'crudService', function ($rootScope, $scope, $route, $location, crudService) {
	$scope.txt;

	$scope.signUpForm = {
		accountName:'Account Name',
		username:'Username',
		password:'Password'
	};
	$scope.signUp = function (accountName, username, password) {
		alert(accountName + ' ' + username + ' ' + password);
	};

	$scope.$on('$routeChangeSuccess', function (event, current, previous) {
		$scope.title = $route.current.title;
	});

	$scope.getTxt = function () {
		crudService.read('/hello/world!')
		.then(function (data) {
			$scope.txt = data;
		});
	};

	$scope.deleteBookmark = function (id) {
		$scope.bookmarks = _.reject($scope.bookmarks, { id: id });
	};

	$scope.getTxt();
}]);