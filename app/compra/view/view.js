var miControlador = miModulo.controller(
    "compraViewController",

    function ($scope, $routeParams, promesasService, auth, $location) {
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
                $scope.producto_obj = response.data.message.producto_obj;
                $scope.factura_obj = response.data.message.factura_obj;
            }, function () {
                $scope.fallo = true;
            })
            promesasService.ajaxListCarrito()
            .then(function successCallback(response) {
                if (response.data.status != 200) {
                    $scope.falloMensaje = response.data.message;
                } else {     
                    
                    if(isEmpty(response.data.message)){
                        $scope.count=0;
                    } else{
                        $scope.count = Object.keys(response.data.message).length;       
                    }
                                     
                }
            }, function (response) {
                $scope.mensaje = "Ha ocurrido un error";
            });
            function isEmpty(obj) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key))
                        return false;
                }
                return true;
            };
    }
)