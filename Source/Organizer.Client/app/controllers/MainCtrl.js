'use strict';

app.controller('MainCtrl',
    function MainCtrlr ($rootScope, auth, $location) {

        if (auth.isAuthenticated()) {
            $rootScope.isLoggedIn = true;
            $rootScope.username = auth.getUsername();
        }

        if (!auth.isAuthenticated()) {
            $location.path('/login');
        }
    });