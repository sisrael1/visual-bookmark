app.controller('MainController', ['$rootScope','$scope', '$route', '$location', 'crudService', function ($rootScope, $scope, $route, $location, crudService) {
	$scope.txt;

	$scope.showPopUp = '';
	$scope.setPopUp = function (name) {
		$scope.showPopUp = $scope.showPopUp == name ? '' : name;
	};

	$scope.signInForm = {
		username:'Username',
		password:'Password'
	};
	$scope.signIn = function (username, password) {
		$scope.signedIn = true;
		$scope.setPopUp('signIn');
		$location.url('dashboard');
	};
	$scope.signOut = function () {
		$scope.signedIn = false;
		$location.url('/');
	};

	$scope.signUpForm = {
		accountName:'Account Name',
		username:'Username',
		password:'Password'
	};
	$scope.signUp = function (accountName, username, password) {
		alert(accountName + ' ' + username + ' ' + password);
	};

	$scope.searchForm = {
		text: ''
	};

	$scope.addBookmarkForm = {
		url: ''
	};

	$scope.$on('$routeChangeSuccess', function (event, current, previous) {
		$scope.title = $route.current.title;
		$scope.setPopUp('');
	});

	$scope.getTxt = function () {
		crudService.read('/hello/world!')
		.then(function (data) {
			$scope.txt = data;
		});
	};


	$scope.isDashboard = function (title) {
		return ['Dashboard', 'Settings', 'Help'].indexOf(title) > -1;
	};

	$scope.deleteBookmark = function (id) {
		$scope.bookmarks = _.reject($scope.bookmarks, { id: id });
	};

	$scope.getTxt();

	$scope.bookmarks = [
		{
			id: 1,
			name: 'Penguins',
			modifiedDate: '1 hour ago',
			tags: [
				'penguin', 'video'
			],
			style: {
				'background-color':'#49f2af'
			}
		},
		{
			id: 2,
			name: 'Dogs',
			modifiedDate: '3 hours ago',
			tags: [
				'dog', 'video'
			],
			style: {
				'background-color':'#a789bf'
			}
		},
		{
			id: 3,
			name: 'Cats',
			modifiedDate: '2 hours ago',
			tags: [
				'cat', 'video'
			],
			style: {
				'background-color':'#b9971c'
			}
		},
		{
			id: 4,
			name: 'Geese',
			modifiedDate: '2 hours ago',
			tags: [
				'geese', 'video'
			],
			style: {
				'background-color':'#b30bdd'
			}
		},
		{
			id: 5,
			name: 'Fish',
			modifiedDate: '2 hours ago',
			tags: [
				'fish', 'video'
			],
			style: {
				'background-color':'#8593ac'
			}
		},
		{
			id: 6,
			name: 'Tigers',
			modifiedDate: '2 hours ago',
			tags: [
				'tiger', 'video'
			],
			style: {
				'background-color':'#a3fa22'
			}
		},
		{
			id: 7,
			name: 'Elephants',
			modifiedDate: '2 hours ago',
			tags: [
				'elephant', 'video'
			],
			style: {
				'background-color':'#bd9705'
			}
		},
		{
			id: 8,
			name: 'Wolves',
			modifiedDate: '2 hours ago',
			tags: [
				'wolf', 'video'
			],
			style: {
				'background-color':'#4866f0'
			}
		}
	];
}]);