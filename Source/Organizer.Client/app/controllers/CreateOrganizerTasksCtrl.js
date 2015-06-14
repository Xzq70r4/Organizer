
app.controller('CreateOrganizerTasksCtrl',
    function CreateOrganizerTasksCtrl($scope, $modalInstance, $route, $timeout,
        organizerData, dateTime, auth) {
        var timer;
        var updateTime = function () {
            $scope.dateTimeNow = Date.now();
            timer = $timeout(updateTime, $scope.dateTimeNow % 1000);
        };
        updateTime();

        $scope.createOrganizerTask = {};
        $scope.createOrganizerTask.priority = 0;

        $scope.isWarning = function (releaseTime) {
            if ((releaseTime <= $scope.dateTimeNow) ||
                (releaseTime === null) ||
                (releaseTime === undefined)) {
                return  'has-warning';
            };
        };

        $scope.submitCreateForm = function (createForm) {
            //working with editOrganizerTask(not with editForm), becouse ui bootstrap timepicker and datepicker not have required and datepiker not work
            if (createForm.$valid &&
                (new Date($scope.editOrganizerTask.releaseTime) > new Date($scope.dateTimeNow))) {

                 $scope.createOrganizerTask.releaseTime = dateTime.converToString($scope.createOrganizerTask.releaseTime);

                organizerData
                   .organizerTask
                   .postOraganizerTask(auth.access_token(), $scope.createOrganizerTask)
                   .then(function (data) {
                       $route.reload();
                       console.log('finished edit' + data);
                   });

                $timeout.cancel(timer);
                $modalInstance.dismiss();
            }
            $scope.$broadcast('has-errors');
        };

        $scope.cancelCreateForm = function () {

            $modalInstance.dismiss();
        };
    });