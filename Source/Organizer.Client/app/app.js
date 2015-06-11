﻿'use strict';

var routeUserChecks = {
    authenticated: {
        authenticate: function (auth, $location) {
            var result = auth.isAuthenticated();
            if (!result) $location.path('/login');
            return result;
        }
    },
    logout: {
        logout: function (auth) {
            auth.logout();
            return true;
        }
    }
};

var app = angular.module('organizerApp', ['ngResource', 'ngRoute', 'ui.bootstrap'])
    .config(function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                resolve: routeUserChecks.authenticated
            })
            .when('/login', {
                templateUrl: 'views/login.html'
            })
            .when('/test', {
                templateUrl: 'views/test.html'
            })
            .when('/add-task', {
                templateUrl: 'views/add-task.html'
            })
            .otherwise({ redirectTo: '/' });
    });