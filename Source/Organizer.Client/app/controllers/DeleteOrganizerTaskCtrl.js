
app.controller('DeleteOrganizerTaskCtrl',
    function DeleteOrganizerTaskCtrl($scope,$window, $location, $modalInstance, $route, organizerData, auth, deleteTaskId) {

        $scope.yesDeleteForm = function () {

            console.log('yes');
            console.log(deleteTaskId);
            organizerData
                .organizerTask
                .deleteOraganizerTask(auth.access_token(), deleteTaskId)
                .then(function (data) {
                    $route.reload();
                console.log('finished delete' + data);
                });
            //TODO: Preload data after delete
            //$window.location.href = '#/';
            $modalInstance.dismiss();
        };


        $scope.noDeleteForm = function () {

            $modalInstance.dismiss();
        };
    });