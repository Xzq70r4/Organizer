'use strict';

app.controller('LoginCtrl',
    function LoginCtrl($rootScope, $scope, $resource, $location, organizerData, auth, Notification) {
        if (auth.isAuthenticated()) {
            $location.path('/');
            return;
        }

        $scope.username = null;

        $scope.login = function () {
            organizerData.account.login($scope.username, $scope.password)
                .then(function (data) {
                    Notification.success('Successful Login!');
                    auth.login(data.userName, data.access_token);
                    $rootScope.isLoggedIn = true;
                    $rootScope.username = auth.getUsername();
                    $location.path('/');
                }, function (error) {
                    Notification.error('<br>Unsuccessful Login!<br>' + error);
                });
        }

        $scope.register = function () {
            organizerData.account.register($scope.username, $scope.password)
                .then(function () {
                    Notification.success('Successful Register!');
                    organizerData.account.login($scope.username, $scope.password)
                        .then(function (data) {
                            Notification.success('Successful Login after Register!');
                            auth.login(data.userName, data.access_token);
                            $rootScope.isLoggedIn = true;
                            $rootScope.username = auth.getUsername();
                            $location.path('/');
                        }, function (error) {
                            Notification.error('<br>Unsuccessful Login after Succesful Register!<br>' + error);
                        });
                }, function (error) {
                    Notification.error('<br>Unsuccessful Register!<br>' + error);
                });
        }
    }
);
