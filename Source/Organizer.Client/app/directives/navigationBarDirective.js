'use strict';

app.directive('navigationBar', function () {
    return {
        restrict : 'A',
        templateUrl : 'views/directive/navigation-bar.html',
        replace : true,
        scope : false
    };
});