app.controller('MainController', ['$rootScope','$scope', '$route', 'crudService', function ($rootScope, $scope, $route, crudService) {
	$scope.txt;

	$scope.showSignIn = false;
	$scope.signInForm = {
		username:'Username',
		password:'Password'
	};
	$scope.signIn = function (username, password) {
		alert(username + ' ' + password);
	};

	$scope.signUpForm = {
		accountName:'Account Name',
		username:'Username',
		password:'Password'
	};
	$scope.signUp = function (accountName, username, password) {
		alert(accountName + ' ' + username + ' ' + password);
	};

	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		$scope.title = $route.current.title;
	});

	$scope.getTxt = function () {
		crudService.read('/hello/world!')
		.then(function (data) {
			$scope.txt = data;
		});
	};

	$scope.getTxt();
}]);