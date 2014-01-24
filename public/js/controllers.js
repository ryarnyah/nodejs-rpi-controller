'use strict';

/* Controllers */
var app = angular.module('nodejs-controller.controllers', []);
app.controller('InfoCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.info = ApiFactory.info();
	
		$scope.refresh = function () {
			$scope.info = ApiFactory.info();
		};
	}
]);

app.controller('UptimeCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.uptime = ApiFactory.uptime();
	
		$scope.refresh = function () {
			$scope.uptime = ApiFactory.uptime();
		};
	}
]);

app.controller('LoadCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.load = ApiFactory.load();
	
		$scope.refresh = function () {
			$scope.load = ApiFactory.load();
		};
	}
]);

app.controller('MemCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.mem = ApiFactory.mem();
	
		$scope.refresh = function () {
			$scope.mem = ApiFactory.mem();
		};
	}
]);

app.controller('MountsCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.mounts = ApiFactory.mounts();
	
		$scope.refresh = function () {
			$scope.mounts = ApiFactory.mounts();
		};
	}
]);

app.controller('NetworkCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.networks = ApiFactory.network();
	
		$scope.refresh = function () {
			$scope.networks = ApiFactory.network();
		};
	}
]);

app.controller('PsCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.ps = ApiFactory.ps();
	
		$scope.refresh = function () {
			$scope.ps = ApiFactory.ps();
		};
	}
]);

app.controller('ShutdownCtrl', ['$scope', 'ApiFactory', 
	function ($scope, ApiFactory) {
		$scope.shutdown = function () {
				ApiFactory.shutdown();
		};
		$scope.reboot = function () {
				ApiFactory.reboot();
		};
	}
]);