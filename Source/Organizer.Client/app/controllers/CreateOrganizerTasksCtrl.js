
app.controller('CreateOrganizerTasksCtrl',
    function CreateOrganizerTasksCtrl($scope, $modalInstance, organizerData, dateTime, auth) {

        $scope.submitCreateForm = function () {
            console.log($scope.createOrganizerTask);

            $scope.createOrganizerTask.releaseTime = dateTime.converToString($scope.createOrganizerTask.releaseTime);

            organizerData
               .organizerTask
               .postOraganizerTask(auth.access_token(), $scope.createOrganizerTask)
               .then(function (data) {
                   console.log('finished edit' + data);
               });

            $modalInstance.dismiss();
        };

        $scope.cancelCreateForm = function () {

            $modalInstance.dismiss();
        };

    });