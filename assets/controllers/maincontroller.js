app.controller('MainController', ['$scope', '$route', '$resource', 'configService', 'authService', function ($scope, $route, $resource, configService, authService) {
	$scope.signUp = function (email, username, password) {
		var credentials = [{
			email: email,
			username: username,
			password: password
		}];

		var User = $resource(configService.apiRoot + '/users');

		User.save(credentials, function () {
			var x = authService.login(credentials[0]);
			x.then(function () { console.log(x); });
		});
	};

	$scope.$on('$routeChangeSuccess', function (event, current, previous) {
		$scope.title = $route.current.title;
	});
}]);