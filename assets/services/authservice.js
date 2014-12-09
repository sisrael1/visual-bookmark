app.factory('authService', ['$rootScope', '$resource', 'configService', function ($rootScope, $resource, configService) {
	var apiRoot = configService.apiRoot;
	var session = {
		user_id: undefined,
		token_string: undefined
	};
	//Move this to its own file
	var Token = $resource(configService.apiRoot + '/token/:user_id', {user_id:'@id'});

	return {
		login: function (credentials) {
			// Create a new token with our credentials
			return Token.save({
				username: credentials.username,
				password: credentials.password
			}, function (value, responseHeaders) {
				// Set our session token and broadcast
				// success event
				session.user_id = value.user_id;
				session.token_string = value.token_string;
				$rootScope.$broadcast('LoginSuccess');
			}, function (value) {
				$rootScope.$broadcast('LoginFailure');
			}).$promise;
		},

		logout: function () {
			return Token.delete({
				user_id: session.user_id,
				session_token: session.session_token
			}, function (value, responseHeaders) {
				delete session.user_id;
				delete session.token_string;
				$rootScope.$broadcast('LogoutSuccess');
			}, function () {
				$rootScope.$broadcast('LogoutFailure');
			}).$promise;
		},

		getSession: function () {
			return session;
		},

		isLoggedIn: function () {
			return session.token_string != undefined;
		}
	};
}]);