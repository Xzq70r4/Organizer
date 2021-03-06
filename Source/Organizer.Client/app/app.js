﻿'use strict';

var routeUserChecks = {
    authenticated: {
        authenticate : function (auth, $location) {
            var result = auth.isAuthenticated();
            if (!result) $location.path('/login');
            return result;
        }
    },
    logout: {
        logout : function (auth) {
            auth.logout();
            return true;
        }
    }
};

var app = angular.module('organizerApp', ['ngResource', 'ngRoute', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate','ui-notification', 'ngStorage' ])
    .config(function ($routeProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = false;

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                resolve: routeUserChecks.authenticated
            })
            .when('/login', {
                templateUrl: 'views/login.html'
            })
            .otherwise({ redirectTo: '/' });
    });
