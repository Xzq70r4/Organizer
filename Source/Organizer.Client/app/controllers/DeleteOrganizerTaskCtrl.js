'use strict';

app.controller('DeleteOrganizerTaskCtrl',
    function DeleteOrganizerTaskCtrl($scope, $window, $location, $modalInstance, $route, organizerData, auth, deleteTaskId, Notification) {

        $scope.yesDeleteForm = function () {

            console.log('yes');
            console.log(deleteTaskId);
            organizerData
                .organizerTask
                .deleteOraganizerTask(auth.access_token(), deleteTaskId)
                .then(function (data) {
                    Notification.success('Successful deleted task!');
                    $route.reload();
                }, function (error) {
                    Notification.error('<br>Unsuccessful delete task!<br>' + error);
                });

            $modalInstance.dismiss();
        };


        $scope.noDeleteForm = function () {

            $modalInstance.dismiss();
        };
    });