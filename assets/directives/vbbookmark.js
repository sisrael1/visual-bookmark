app.directive('vbBookmark', function () {
	return {
		scope: {
			id: '=',
			title: '=',
			url: '=',
			createdDate: '=',
			tags: '=',
			vbStyle: '='
		},
		templateUrl: 'assets/directives/vbbookmark.html',
		restrict: 'E'
	};
});