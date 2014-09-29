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

	$scope.getTxt();

	$scope.bookmarks = [
		{
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