'use strict';

/* Controllers */
var app = angular.module('nodejs-controller.controllers', []);
app.controller('InfoCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.info = ApiFactory.info();
	
		$scope.refresh = function (thingId) {
			$scope.info = ApiFactory.info();
		};
	}
]);

app.controller('UptimeCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.uptime = ApiFactory.uptime();
	
		$scope.refresh = function (thingId) {
			$scope.uptime = ApiFactory.uptime();
		};
	}
]);

app.controller('LoadCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.load = ApiFactory.load();
	
		$scope.refresh = function (thingId) {
			$scope.load = ApiFactory.load();
		};
	}
]);

app.controller('MemCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.mem = ApiFactory.mem();
	
		$scope.refresh = function (thingId) {
			$scope.mem = ApiFactory.mem();
		};
	}
]);

app.controller('MountsCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.mounts = ApiFactory.mounts();
	
		$scope.refresh = function (thingId) {
			$scope.mounts = ApiFactory.mounts();
		};
	}
]);

app.controller('NetworkCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.networks = ApiFactory.network();
	
		$scope.refresh = function (thingId) {
			$scope.networks = ApiFactory.network();
		};
	}
]);

app.controller('PsCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.ps = ApiFactory.ps();
	
		$scope.refresh = function (thingId) {
			$scope.ps = ApiFactory.ps();
		};
	}
]);

app.controller('ShutdownCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.shutdown = function (thingId) {
				ApiFactory.shutown();
		};
		$scope.reboot = function (thingId) {
				ApiFactory.reboot();
		};
	}
]);