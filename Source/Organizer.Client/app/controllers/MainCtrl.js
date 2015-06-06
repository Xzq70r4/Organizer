'use strict';

app.controller('MainCtrl',
    function MainCtrlr($scope, $rootScope, auth, $location) {

        if (auth.isAuthenticated()) {
            $rootScope.isLoggedIn = true;
            $rootScope.username = auth.getUsername();
        }

        if (!auth.isAuthenticated()) {
            $location.path('/login');
        }
    }
);