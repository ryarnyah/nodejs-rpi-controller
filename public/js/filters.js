'use strict';

/* Filters */

var filters = angular.module('nodejs-controller.filters', []);

filters.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
}]);

filters.filter('getByProperty', function() {
    return function(propertyName, propertyValue, collection) {
        var i = 0, len = collection.length;
        for (; i<len; i++) {
            if (collection[i][propertyName] == +propertyValue) {
                return collection[i];
            }
        }
        return null;
    }
});
