'use strict';

app.controller('LogoutCtrl',
    function LogoutController($rootScope, $scope, $resource, $location, organizerData, auth, Notification) {
        $scope.logout = function () {
            auth.logout();
            $rootScope.isLoggedIn = false;
            $location.path('/login');
            Notification.success('Successful LogOut!');
            return;
        }
    }
);
