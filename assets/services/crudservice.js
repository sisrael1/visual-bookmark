app.factory('crudService', ['$http', '$q', function ($http, $q) {
	var apiRoot = 'api/index.php';	

	return {
		create: function (location, params) {
			var defer = $q.defer();

			$http({
				method: 'POST',
				url: apiRoot + location,
				data: JSON.stringify(params)
			})
				.success(function(data, status, headers, config) {
					defer.resolve(data, status, headers, config);
				})
				.error(function(data, status, headers, config) {
					defer.reject(data, status, headers, config);
				});

			return defer.promise;
		},

		read: function (location, params) {
			var defer = $q.defer();

			$http({ method: 'GET', url: apiRoot + location, params: params })
				.success(function(data, status, headers, config) {
					defer.resolve(data, status, headers, config);
				})
				.error(function(data, status, headers, config) {
					defer.reject(data, status, headers, config);
				});

			return defer.promise;
		},

		update: function (location, params) {
			var defer = $q.defer();

			$http({
				method: 'PUT',
				url: apiRoot + location,
				data: JSON.stringify(params)
			})
				.success(function(data, status, headers, config) {
					defer.resolve(data, status, headers, config);
				})
				.error(function(data, status, headers, config) {
					defer.reject(data, status, headers, config);
				});

			return defer.promise;
		},

		delete: function (location, params) {
			var defer = $q.defer();

			$http({
				method: 'DELETE',
				url: apiRoot + location,
				data: JSON.stringify(params)
			})
				.success(function(data, status, headers, config) {
					defer.resolve(data, status, headers, config);
				})
				.error(function(data, status, headers, config) {
					defer.reject(data, status, headers, config);
				});

			return defer.promise;
		}
	};
}]);