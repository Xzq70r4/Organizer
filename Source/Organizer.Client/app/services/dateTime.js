'use strict';

app.factory('dateTime', function () {
    return {
        converToString: function (formDateTime) {
            var date = new Date(formDateTime);
            var day = date.getDate();        // yields day
            var month = date.getMonth() + 1;    // yields month
            var year = date.getFullYear();  // yields year
            var hour = date.getHours();     // yields hours 
            var minute = date.getMinutes(); // yields minutes
            var second = date.getSeconds(); // yields seconds

            // After this construct a string with the above results as below
            var time = year + "/" + month + "/" + day + " " + hour + ':' + minute + ':' + second;

            return time;
        }
    }
});