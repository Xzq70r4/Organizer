'use strict';

app.directive("myCurrentTime", function () {
    return function (scope, element, attrs) {
        var format;

        scope.$watch(attrs.myCurrentTime, function (value) {
            format = value;
            updateTime();
        });

        function updateTime() {
            var dt = new Date();
            element.text(dt);
        }

        function updateLater() {
            setTimeout(function () {
                updateTime(); // update DOM
                updateLater(); // schedule another update
            }, 1000);
        }

        updateLater();
    }
});