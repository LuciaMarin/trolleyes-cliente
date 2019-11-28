var miControlador = miModulo.controller(
    "compraViewController",

    function ($scope, $routeParams, promesasService, auth) {
        $scope.controller = "compraViewController";
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        promesasService.ajaxGet('compra', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.cantidad = response.data.message.cantidad;
                $scope.producto_obj = response.data.message.producto_obj.descripcion;
                $scope.factura_obj = response.data.message.factura_obj.id;
            }, function () {
                $scope.fallo = true;
            })
    }
)
