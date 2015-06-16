'use strict';

app.controller('LogoutCtrl',
    function LogoutController ($rootScope, $scope, $location, auth, Notification) {
        $scope.logout = function() {
            auth.logout();
            $rootScope.isLoggedIn = false;
            $location.path('/login');
            Notification.success('Successful LogOut!');
            return;
        };
    });
