app.controller('DashboardController', ['$rootScope', '$scope', 'crudService', '$resource', function ($rootScope, $scope, crudService, $resource) {
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

	$scope.$on('DeleteBookmarkSuccess', function() {
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
		console.log($scope.bookmarks);
		var Bookmark = $resource('api/index.php/users/1/bookmarks/' + id);
		Bookmark.delete();
		$scope.$emit('DeleteBookmarkSuccess');
	};

	$scope.search = function (text) {

	};
}]);