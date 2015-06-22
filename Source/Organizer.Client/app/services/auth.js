'use strict';

app.factory('auth', function ($localStorage) {
    return {
        login: function (username, token) {
            $localStorage.username = username;
            $localStorage.access_token = token;

        },
        access_token: function() {
            return $localStorage.access_token;
        },
        logout: function () {
            $localStorage.$reset();
        },
        isAuthenticated: function () {
            return $localStorage.access_token !== undefined &&
                $localStorage.username !== undefined;
        },
        getUsername: function () {
            return $localStorage.username;
        }
    };
});