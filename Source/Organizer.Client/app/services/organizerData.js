'use strict';

app.factory('organizerData', function ($resource, $http, $q) {
    var url = 'http://localhost:9274/';

    function register(username, password) {
        var deferred = $q.defer();

        $http.post(url + 'api/Account/Register', {
            Username: username,
            Password: password,
            ConfirmPassword: password
        },
            {
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    function login(username, password) {
        var deferred = $q.defer();

        $http.post(url + 'Token', {
            username: username,
            password: password,
            grant_type: "password"
        },
            {
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    function postOraganizerTask(access_token, organizerTask) {
        var deferred = $q.defer();
        console.log(organizerTask);

        $http.post(url + 'api/OrganizerTasks/Post',
            organizerTask,
            {
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + access_token
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    }


    function getOraganizerTasks(access_token) {
        var deferred = $q.defer();

        $http.get(url + 'api/OrganizerTasks/Get',
            {
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    console.log('str: ' + str.join("&"));
                    return str.join("&");
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + access_token
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function getOraganizerTaskById(access_token, taskId) {
        var deferred = $q.defer();

        $http.get(url + 'api/OrganizerTasks/Get/' + taskId,
            {
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + access_token
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function putOraganizerTask(access_token, organizerTask) {
        var deferred = $q.defer();
        console.log(organizerTask);

        $http.put(url + 'api/OrganizerTasks/Put/' + organizerTask.id,
            organizerTask,
            {
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + access_token
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function deleteOraganizerTask(access_token, taskId) {
        var deferred = $q.defer();
        console.log("service " + taskId);

        $http.delete(url + 'api/OrganizerTasks/Delete/' + taskId,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + access_token
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    }

    return {
        account: {
            register: register,
            login: login
        },
        organizerTask: {
            postOraganizerTask: postOraganizerTask,
            getOrganizerTasks: getOraganizerTasks,
            deleteOraganizerTask: deleteOraganizerTask,
            getOraganizerTaskById: getOraganizerTaskById,
            putOraganizerTask: putOraganizerTask
        }
    };
});
