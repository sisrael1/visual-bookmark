app.factory('authService', ['$rootScope', '$resource', 'configService', function ($rootScope, $resource, configService) {
	var apiRoot = configService.apiRoot;
	var sessionToken;
	//Move this to its own file
	var Token = $resource(configService.apiRoot + '/token');

	return {
		login: function (credentials) {
			// Create a new token with our credentials
			return Token.save({
				username: credentials.username,
				password: credentials.password
			}, function (value, responseHeaders) {
				// Set our session token and broadcast
				// success event
				sessionToken = value.token_string;
				$rootScope.$broadcast('LoginSuccess');
			}, function (value) {
				console.log(value);
				$rootScope.$broadcast('LoginFailure');
			}).$promise;
		},

		logout: function () {
			return Token.delete({
				sessionToken: sessionToken
			}, function (value, responseHeaders) {
				sessionToken = null;
				$rootScope.$broadcast('LogoutSuccess');
			}, function () {
				$rootScope.$broadcast('LogoutFailure');
			}).$promise;
		}
	};
}]);