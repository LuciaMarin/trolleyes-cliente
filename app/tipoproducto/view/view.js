'use strict';
var miControlador = miModulo.controller('tipoproductoViewController',
    function ($scope, $http, $routeParams, auth, promesasService) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
        }

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        promesasService.ajaxGet('tipo_producto', $routeParams.id)
            .then(function (response) {
                $scope.status = response.status;
                $scope.data = response.data.message;
            }, function (response) {
                $scope.status = response.status;
                $scope.data = response.data.message || 'Request failed';
            });

        $scope.volver = function () {
            window.history.back();
        };
    }
);