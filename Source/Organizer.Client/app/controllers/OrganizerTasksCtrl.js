'use strict';

app.controller('OrganizerTasksCtrl',
    function OrganizerTasksCtrl($scope, organizerData, auth, $filter, $modal, $localStorage) {

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

    $scope.showCreateTaskForm = function () {
        $modal.open({
            templateUrl: 'views/add-task.html',
            controller: 'CreateOrganizerTasksCtrl'
        });
    };

    $scope.getClass = function(priority, releaseTime) {
        var now = $filter('date')(new Date(Date.now()), 'yyyy-MM-dd HH:mm:ss Z');
        var time = $filter('date')(releaseTime, 'yyyy-MM-dd HH:mm:ss Z');

        if (priority === 0 && (time > now)) {
            return 'danger';
        }
        else if (priority === 1 && time > now) {
            return 'warning';
        } else {
            return 'past';
        }
    };

    if ($.isEmptyObject(localStorage.organizerTasks)) {
        organizerData
            .organizerTask
            .getOrganizerTasks(auth.access_token())
            .then(function (data) {
                $scope.organizerTasks = data;
            });
    } else {
        $scope.organizerTasks = $localStorage.organizerTasks;
    }

    $scope.$watch('organizerTasks', function () {
        $localStorage.organizerTasks = $scope.organizerTasks;
    }, true);

    $scope.sortBy = 'releaseTime';
    $scope.sortTypeText = 'Descending';
    $scope.sortByReverse = true;

    $scope.sortTypeClicked = function () {
        if ($scope.sortTypeText === 'Ascending') {
            $scope.sortTypeText = 'Descending';
        }
        else {
            $scope.sortTypeText = 'Ascending';
        }
        $scope.sortByReverse = !$scope.sortByReverse;
    };

    var pagesShown = 1;

    var pageSize = 3;

    $scope.paginationLimit = function (data) {
        return pageSize * pagesShown;
    };

    $scope.hasMoreItemsToShow = function () {
        return pagesShown < (jQuery($scope.organizerTasks).size() / pageSize);
    };

    $scope.showMoreItems = function () {
        pagesShown = pagesShown + 1;
    };
});