'use strict';

app.controller('DeleteOrganizerTaskCtrl',
    function DeleteOrganizerTaskCtrl ($scope, $modalInstance, $route, organizerData, auth, deleteTaskId, Notification) {

        $scope.yesDeleteForm = function () {

            organizerData
                .organizerTask
                .deleteOraganizerTask(auth.access_token(), deleteTaskId)
                .then(function () {
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