'use strict';
var miControlador = miModulo.controller('tipoproductoUpdateController',
    function ($scope, $http, $routeParams, promesasService) {
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

        promesasService.ajaxGet('tipo_producto', $routeParams.id)
            .then(function (response) {
                $scope.status = response.status;
                $scope.id = response.data.message.id;
                $scope.desc = response.data.message.desc;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });

        $scope.volver = function () {
            window.history.back();
        };

        $scope.editar = function () {
            var json = {
                id: $scope.id,
                desc: $scope.desc
            };
            promesasService.ajaxUpdate('tipo_producto', { params: jsonToSend })
                .then(function (response) {
                    $scope.status = response.status;
                    $scope.ajaxData = response.data.message;
                    if ($scope.status === 200) {
                        $scope.formulario = false;
                        $scope.botones = false;
                        $scope.correcto = true;
                    }
                }, function (response) {
                    $scope.status = response.status;
                    $scope.ajaxData = response.data.message || 'Request failed';
                });
        };
    }
);