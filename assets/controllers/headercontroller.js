app.controller('HeaderController', ['$rootScope', '$scope', '$route', 'crudService', 'authService', function ($rootScope, $scope, $route, crudService, authService) {
	/*
		HeaderController constants
	*/
	$scope.menuStateEnum = {
		MAIN: 0,
		DASHBOARD: 1
	};

	$scope.menuPopUpEnum = {
		BLANK: 0,
		SIGN_IN: 1,
		SEARCH: 2,
		ADD_BOOKMARK: 3
	};

	/*
		HeaderController state
	*/
	$scope.menuState = $scope.menuStateEnum.MAIN;
	$scope.menuPopUpState = $scope.menuPopUpEnum.BLANK;
	$scope.signedIn = false;
	$scope.menuLinks = [];
	$scope.currentPage;
	$scope.signInForm = {
		username:'Username',
		password:'Password'
	};
	$scope.searchForm = {
		text: ''
	};

	$scope.addBookmarkForm = {
		url: ''
	};

	/*
		HeaderController events
	*/
	$scope.$on('$routeChangeSuccess', function () {
		$scope.menuState = ['Dashboard', 'Settings', 'Help'].indexOf($route.current.title) > -1 ?
			$scope.menuStateEnum.DASHBOARD :
			$scope.menuStateEnum.MAIN;
		$scope.setMenuLinks();

		$scope.menuPopUpState = $scope.menuPopUpEnum.BLANK;

		$scope.currentPage = {
			id: $route.current.id,
			title: $route.current.title
		};
	});

	$scope.$on('LoginSuccess', function () {
		$scope.signedIn = true;
		$scope.setMenuLinks();
	});

	$scope.$on('LogoutSuccess', function () {
		$scope.signedIn = false;
		$scope.setMenuLinks();
	});

	/*
		HeaderController functions
	*/
	$scope.setMenuLinks = function () {
		switch ($scope.menuState) {
			case $scope.menuStateEnum.MAIN:
				$scope.menuLinks = [
					{
						id: 1,
						route: $route.routes['/product'],
						text: 'Product',
						click: function () {}
					}
				];
				break;
			case $scope.menuStateEnum.DASHBOARD:
				$scope.menuLinks = [
					{
						id: 1,
						url: '',
						text: 'Search',
						click: function () { $scope.menuPopUpState = $scope.menuPopUpState == $scope.menuPopUpEnum.SEARCH ? $scope.menuPopUpEnum.BLANK : $scope.menuPopUpEnum.SEARCH; }
					},
					{
						id: 2,
						url: '',
						text: 'Add Bookmark',
						click: function () { $scope.menuPopUpState = $scope.menuPopUpState == $scope.menuPopUpEnum.ADD_BOOKMARK ? $scope.menuPopUpEnum.BLANK : $scope.menuPopUpEnum.ADD_BOOKMARK; }
					},
					{
						id: 4,
						route: $route.routes['/settings'],
						text: 'Settings',
						click: function () {}
					},
					{
						id: 5,
						route: $route.routes['/help'],
						text: 'Help',
						click: function () {}
					}
				];
				break;
		}

		switch ($scope.signedIn) {
			case false:
				$scope.menuLinks.push({
					id: 2,
					route: $route.routes['/dashboard'],
					text: 'Tour',
					click: function () {}
				});
				$scope.menuLinks.push({
					id: 6,
					url: '',
					text: 'Sign in',
					click: function () { $scope.menuPopUpState = $scope.menuPopUpState == $scope.menuPopUpEnum.SIGN_IN ? $scope.menuPopUpEnum.BLANK : $scope.menuPopUpEnum.SIGN_IN; }
				});
				break;
			case true:
				$scope.menuLinks.push({
					id: 3,
					route: $route.routes['/dashboard'],
					text: 'Dashboard',
					click: function () {}
				});
				$scope.menuLinks.push({
					id: 7,
					url: '',
					text: 'Sign out',
					click: function () { authService.logout(); }
				});
				break;
		}
	};

	$scope.execMenuAction = function (args) {
		if (args)
			var link = _.find($scope.menuLinks, { id: args.id });
		if (link)
			if (link.click)
				link.click(args);
	};

	$scope.signIn = function (username, password) {
		authService.login({
			username: username,
			password: password
		}).then(function (data, status, headers, config) {
			$scope.menuPopUpState = $scope.menuPopUpEnum.BLANK;
		});
	};

	$scope.addBookmarkFailure = false;
	$scope.addBookmark = function (args) {
		crudService.create('/users/' + authService.getSession().user_id + '/bookmarks', {
			"title": args,
			"url": args
		}).then(function (data, status, headers, config) {
			$rootScope.$broadcast('AddBookmarkSuccess');
			$scope.addBookmarkFailure = false;
		}, function (data, status, headers, config) {
			console.log(data);
			$scope.addBookmarkFailure = true;
		});
	};

	/*
		HeaderController state initialization
	*/
	$scope.setMenuLinks();
}]);