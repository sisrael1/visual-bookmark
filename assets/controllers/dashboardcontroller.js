app.controller('DashboardController', ['$rootScope', '$scope', 'crudService', '$resource', 'authService', function ($rootScope, $scope, crudService, $resource, authService) {
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

	$scope.$on('AddBookmarkSuccess', function() {
		$scope.refreshBookmarks();
	});

	$scope.$on('DeleteBookmarkSuccess', function() {
		$scope.refreshBookmarks();
	});

	$scope.$on('LoginSuccess', function () {
		$scope.refreshBookmarks();
	});

	$scope.$on('LogoutSuccess', function () {
		$scope.bookmarks = undefined;
	});

	/*
		DashboardController functions
	*/
	$scope.createBookmark = function (url) {

	};

	$scope.updateBookmark = function (bookmark) {

	};

	$scope.deleteBookmark = function (id) {
		var Bookmark = $resource('api/index.php/users/' + authService.getSession().user_id + '/bookmarks/' + id);
		Bookmark.delete().$promise.then(function (data) {
			$scope.$emit('DeleteBookmarkSuccess');
		});
	};

	$scope.search = function (text) {

	};

	$scope.refreshBookmarks = function () {
		crudService.read('/users/' + authService.getSession().user_id + '/bookmarks')
		.then(function (data) {
			$scope.bookmarks = data;
		});
	};

	$scope.refreshBookmarks();
}]);