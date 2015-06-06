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

    return {
        account: {
            register: register,
            login: login
        }
    }
});
