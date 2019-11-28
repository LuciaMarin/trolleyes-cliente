'use strict';
var miControlador = miModulo.controller('tipousuarioEditController',
    function ($scope, $http, $routeParams, auth) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
        }

        $scope.formulario = true;
        $scope.botones = true;
        $scope.correcto = false;

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=tipo_usuario&op=get&id=' + $routeParams.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.id = response.data.message.id;
            $scope.descripcion = response.data.message.descripcion;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.volver = function () {
            window.history.back();
        };

        $scope.modificar = function () {
            const datos = {
                id: parseInt($routeParams.id),
                descripcion: $scope.descripcion,

            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            $http.get('http://localhost:8081/trolleyes/json?ob=tipo_usuario&op=update', {
                params: jsonToSend
            })
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                    }
                    $scope.hecho = true;
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        }
    }
);