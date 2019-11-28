var miControlador = miModulo.controller(
    "carritoPlistController",
 
    function ($scope, $routeParams,$http, promesasService, $window,auth,$location) {
        $scope.controller = "carritoPlistController";
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel =  auth.data.message.tipo_usuario_obj;


        promesasService.ajaxListCarrito()
        .then(function successCallback(response) {
            if (response.data.status != 200) {
                $scope.fallo = true;
                $scope.falloMensaje = response.data.response;
            } else {
                $scope.fallo = false;
                $scope.hecho = true;
                $scope.status = response.data.status;
                $scope.pagina = response.data.message;
            }
            $scope.hecho = true;
        })

        $scope.add = function () {
            const datos = {
                id: $scope.id,
                cantidad: $scope.cantidad,
                
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            promesasService.ajaxAddCarrito(id, cantidad)
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
        $scope.buy =  function () {
        promesasService.ajaxBuy()
            .then(function successCallback(response) {
                if (response.data.status != 200) {
                    $scope.fallo = true;
                    $scope.falloMensaje = response.data.response;
                    $scope.compraRealizada =false;
                } else {
                    $scope.fallo = false;
                    $scope.hecho = true;
                    $scope.compraRealizada =true;
                }
                $scope.hecho = true;
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
            $location.path('/home/12/1');
        };
    }
)