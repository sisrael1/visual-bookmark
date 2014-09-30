app.controller('DashboardController', ['$rootScope', '$scope', 'crudService', function ($rootScope, $scope, crudService) {
	/*
		DashboardController events
	*/
	$scope.$on('CreateBookmarkSuccess', function () {

	});

	$scope.$on('CreateBookmarkFailure', function () {

	});

	/*
		DashboardController state
	*/
	$scope.bookmarks = [
		{
			id: 1,
			name: 'Penguins',
			modifiedDate: '1 hour ago',
			tags: [
				'penguin', 'video'
			],
			style: {
				'background-image':'url(assets/images/penguins.png)'
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
				'background-image':'url(assets/images/dogs.png)'
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
				'background-image':'url(assets/images/cats.png)'
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
				'background-image':'url(assets/images/geese.png)'
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

	/*
		DashboardController functions
	*/
	$scope.createBookmark = function (url) {

	};

	$scope.updateBookmark = function (bookmark) {

	};

	$scope.deleteBookmark = function (id) {
		$scope.bookmarks = _.reject($scope.bookmarks, { id: id });
	};

	$scope.search = function (text) {

	};
}]);