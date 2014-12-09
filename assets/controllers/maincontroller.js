app.controller('MainController', ['$rootScope','$scope', '$route', '$resource', '$location', 'configService', 'authService', function ($rootScope, $scope, $route, $resource, $location, configService, authService) {
	$scope.signUp = function (email, username, password) {
		var credentials = {
			email: email,
			username: username,
			password: password
		};

		var User = $resource(configService.apiRoot + '/users');

		User.save(credentials, function () {
			authService.login(credentials);
			$scope.signUpFailure = false;
			$rootScope.$broadcast('SignUpSucceeded');
		}, function () {
			$scope.signUpFailure = true;
			$rootScope.$broadcast('SignUpFailed');
		});
	};

	$scope.$on('$routeChangeSuccess', function (event, current, previous) {
		$scope.title = $route.current.title;
	});

	$scope.$on('LogoutSuccess', function (event, current, previous) {
		$location.path("/");
	});
}]);