'use strict';
var miControlador = miModulo.controller('usuarioViewPerfilController',
    function ($scope, auth,$location) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authid = auth.data.message.id;
            $scope.authdni = auth.data.message.dni;
            $scope.authnombre = auth.data.message.nombre;
            $scope.authapellido1 = auth.data.message.apellido1;
            $scope.authapellido2 = auth.data.message.apellido2;
            $scope.authemail = auth.data.message.email;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
            $scope.controller = "usuarioViewPerfilController";
        }
        
        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };
    }
);