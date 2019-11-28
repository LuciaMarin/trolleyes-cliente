var miControlador = miModulo.controller(
    "facturaRemoveController",
    function ($scope, $routeParams, $location, promesasService, auth) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
        }

        $scope.id = $routeParams.id;
        $scope.controller = "facturaRemoveController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        promesasService.ajaxGet('factura', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
                $scope.iva = response.data.message.iva;
                $scope.usuario_obj_nombre = response.data.message.usuario_obj.nombre;
                $scope.usuario_obj_apellido1 = response.data.message.usuario_obj.apellido1;
                $scope.usuario_obj_apellido2 = response.data.message.usuario_obj.apellido2;
            }, function () {
                $scope.fallo = true;
            })

        $scope.remove = function () {
            promesasService.ajaxRemove('factura', $routeParams.id)
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        }
        $scope.volver = function () {
            window.history.back();
        };

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };
    }
)