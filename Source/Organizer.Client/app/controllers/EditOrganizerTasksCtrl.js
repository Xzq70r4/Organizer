'use strict';

app.controller('EditOrganizerTasksCtrl',
    function EditOrganizerTasksCtrl ($scope, $modalInstance, $route, $filter, $timeout,
        organizerData, auth, editTaskId, dateTime, Notification) {
        var timer;
        var updateTime = function () {
            $scope.dateTimeNow = Date.now();
            timer = $timeout(updateTime, $scope.dateTimeNow % 1000);

        };
        updateTime();

        organizerData
            .organizerTask
            .getOraganizerTaskById(auth.access_token(), editTaskId)
            .then(function (data) {
                $scope.editOrganizerTask = angular.copy(data);
                $scope.editOrganizerTask.releaseTime =
                    $filter('date')($scope.editOrganizerTask.releaseTime, 'yyyy-MM-dd HH:mm:ss Z');
            });

        $scope.isError = function (releaseTime) {
            if ((releaseTime <= $scope.dateTimeNow) ||
                (releaseTime === null) ||
                (releaseTime === undefined) ||
                ($scope.dateTimeSubmit === true)) {
                return 'has-error';
            };
        };

        $scope.checkerDateTime = function (releaseTime) {
            if (releaseTime <= $scope.dateTimeNow ||
                (releaseTime === null) ||
                (releaseTime === undefined)) {

                return true;
            };
        };

        $scope.submitEditForm = function (editForm) {
            //working with editOrganizerTask(not with editForm), becouse ui bootstrap timepicker and datepicker not have required and datepiker not work
            if (editForm.$valid &&
               (new Date($scope.editOrganizerTask.releaseTime) > new Date($scope.dateTimeNow))) {

                $scope.editOrganizerTask.releaseTime = dateTime.converToString($scope.editOrganizerTask.releaseTime);

                organizerData
                   .organizerTask
                   .putOraganizerTask(auth.access_token(), $scope.editOrganizerTask)
                   .then(function () {
                       Notification.success('Successful edited task!');
                       $route.reload();
                   }, function (error) {
                       Notification.error('<br>Unsuccessful edited task!<br>' + error);
                   });

                    $timeout.cancel(timer);
                    $modalInstance.dismiss();
            }

            if (new Date($scope.editOrganizerTask.releaseTime) <= new Date($scope.dateTimeNow)) {
                $scope.dateTimeSubmit = true;
            }

            $scope.$broadcast('has-errors');
        };

        $scope.cancelEditForm = function () {

            $modalInstance.dismiss();
        };
    });