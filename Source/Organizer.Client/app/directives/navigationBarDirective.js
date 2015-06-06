'use strict';

app.directive('navigationBar', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/navigation-bar.html',
        replace: true,
        scope: false
    }
});