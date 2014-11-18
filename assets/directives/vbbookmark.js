app.directive('vbBookmark', function () {
	return {
		scope: {
			bookmarkId: '=',
			title: '=',
			url: '=',
			createdDate: '=',
			tags: '=',
			vbStyle: '=',
			deleteButton: '&'
		},
		templateUrl: 'assets/directives/vbbookmark.html',
		restrict: 'E'
	};
});