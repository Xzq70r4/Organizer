
app.controller('EditOrganizerTasksCtrl',
    function EditOrganizerTasksCtrl($scope, $modalInstance, organizerData, auth, editTaskId, $filter, dateTime) {
        organizerData
            .organizerTask
            .getOraganizerTaskById(auth.access_token(), editTaskId)
            .then(function (data) {
                $scope.editOrganizerTask = angular.copy(data);
                $scope.editOrganizerTask.releaseTime = 
                    $filter('date')($scope.editOrganizerTask.releaseTime, 'yyyy-MM-dd HH:mm:ss Z');
            });

        $scope.submitEditForm = function () {

            $scope.editOrganizerTask.releaseTime = dateTime.converToString($scope.editOrganizerTask.releaseTime);

            organizerData
               .organizerTask
               .putOraganizerTask(auth.access_token(), $scope.editOrganizerTask)
               .then(function (data) {
                   console.log('finished edit' + data);
               });

            $modalInstance.dismiss();
        };

        $scope.cancelEditForm = function () {

            $modalInstance.dismiss();
        };

    });