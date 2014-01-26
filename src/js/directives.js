'use strict';

/* Directives */

var directives = angular.module('nodejs-controller.directives', []);

directives.directive('i18n', ['LocalisationFactory',
        function(LocalisationFactory)
        {
            return {
                restrict : "EAC",
                link : function (scope, elm, attrs)
                {
					var str = attrs.i18n ? attrs.i18n : elm.html();
					LocalisationFactory.translate(str, function(tag){
						if( (tag !== null) && (tag !== undefined) && (tag !== '') )
						{
							elm.html(tag);
						}
					});
                }
            }
        }
    ]
);