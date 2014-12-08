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
		link: function (scope,element,attrs) {
			console.log(scope.deleteButton(1));
		},
		templateUrl: 'assets/directives/vbbookmark.html',
		restrict: 'E'
	};
});