var miControlador = miModulo.controller(
    "carritoRemoveController",
    function ($scope, $routeParams, promesasService, auth, $location) {
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel = auth.data.message.tipo_usuario_obj;
        $scope.controller = "carritoRemoveController";
        $scope.cantidad = 1;

        promesasService.ajaxGet('producto', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.codigo = response.data.message.codigo;
                $scope.existencias = response.data.message.existencias;
                $scope.precio = response.data.message.precio;
                $scope.imagen = response.data.message.imagen;
                $scope.descripcion = response.data.message.descripcion;
                $scope.tipo_producto_obj = response.data.message.tipo_producto_obj;
            }, function () {
                $scope.fallo = true;
            })

        $scope.menos = function () {
            if ($scope.cantidad == 1) {
                $scope.cantidad = 1;
            } else {
                $scope.cantidad--;
            }
        }
        $scope.mas = function () {
            $scope.cantidad++;
        }
        $scope.remove = function () {
            promesasService.ajaxRemoveCarrito($scope.id, $scope.cantidad)
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.response;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                        $location.path("/carrito/plist");
                    }
                    $scope.hecho = true;
                })
        }
    }
)
