﻿'use strict';

app.factory('auth', function ($localStorage) {
    return {
        login: function (username, token) {
            $localStorage.setItem('username', username);
            $localStorage.setItem('access_token', token);
        },
        access_token: function () {
            return $localStorage.getItem('access_token');
        },
        logout: function () {
            $localStorage.removeItem('access_token');
            $localStorage.removeItem('username');
            $localStorage.removeItem('organizerTasks');
        },
        isAuthenticated: function () {
            return $localStorage.getItem('access_token') != undefined &&
                $localStorage.getItem('username') != undefined;
        },
        getUsername: function () {
            return $localStorage.getItem('username');
        }
    }
});