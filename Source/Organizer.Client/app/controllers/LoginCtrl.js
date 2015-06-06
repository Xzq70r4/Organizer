'use strict';

app.controller('LoginCtrl',
    function LoginCtrl($rootScope, $scope, $resource, $location, organizerData, auth) {
        if (auth.isAuthenticated()) {
            $location.path('/');
            return;
        }

        $scope.username = null;

        $scope.login = function () {
            organizerData.account.login($scope.username, $scope.password)
                .then(function (data) {
                    auth.login(data.userName, data.access_token);
                    $rootScope.isLoggedIn = true;
                    $rootScope.username = auth.getUsername();
                    $location.path('/');
                }, function (data) {
                    console.log("The request is invalid.", data.error_description);
                });
        }

        $scope.register = function () {
            organizerData.account.register($scope.username, $scope.password)
                .then(function () {
                    organizerData.account.login($scope.username, $scope.password)
                        .then(function (data) {
                            auth.login(data.userName, data.access_token);
                            $rootScope.isLoggedIn = true;
                            $rootScope.username = auth.getUsername();
                            $location.path('/');
                        }, function (data) {
                            console.log("The request is invalid.", data.error_description);
                        });
                }, function (data) {
                    console.log(data.Message, data.ModelState[Object.keys(data.ModelState)[0]][0]);
                });
        }
    }
);
