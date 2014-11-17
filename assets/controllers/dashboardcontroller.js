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
	$scope.bookmarks;

	crudService.read('/users/1/bookmarks')
	.then(function (data) {
		$scope.bookmarks = data;
		console.log($scope.bookmarks);
	});

	$scope.$on('AddBookmarkSuccess', function() {
		crudService.read('/users/1/bookmarks')
		.then(function (data) {
			$scope.bookmarks = data;
			console.log($scope.bookmarks);
		});
	});

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