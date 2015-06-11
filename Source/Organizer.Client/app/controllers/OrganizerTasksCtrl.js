'use strict';

app.controller('OrganizerTasksCtrl',
    function OrganizerTasksCtrl($scope, organizerData, auth, $filter, $modal) {

    $scope.showCreateTaskForm = function () {
        $modal.open({
            templateUrl: 'views/add-task.html',
            controller: 'CreateOrganizerTasksCtrl'
        });
    };

    $scope.showEditTaskForm = function (taskId) {
        $modal.open({
            templateUrl: 'views/edit-task.html',
            controller: 'EditOrganizerTasksCtrl',
            resolve: {
                editTaskId: function () {
                    return taskId;
                }
            }
        });
    };

    $scope.showDeleteTaskForm = function (taskId) {
        console.log(taskId);
        $modal.open({
            templateUrl: 'views/delete-task.html',
            controller: 'DeleteOrganizerTaskCtrl',
            resolve: {
                deleteTaskId: function () {
                    return taskId;
                }
            }
        });
    };

    $scope.getClass = function(priority, releaseTime) {
        var now = $filter('date')(new Date(Date.now()), 'yyyy-MM-dd HH:mm:ss Z');
        var time = $filter('date')(releaseTime, 'yyyy-MM-dd HH:mm:ss Z');
        //console.log(now ===time);
        //console.log(time > now);
        //console.log(time < now);
        if (priority === 0 && (time > now)) {
            return 'danger';
        }
        else if (priority === 1 && time > now) {
            return 'warning';
        } else {
            return 'past';
        }
    };

    organizerData
        .organizerTask
        .getOrganizerTasks(auth.access_token())
        .then(function (data) {
        $scope.organizerTasks = data;
         });
});