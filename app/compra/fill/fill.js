var miControlador = miModulo.controller(
    "compraFillController",

    function ($scope, promesasService, auth,level, $location) {
        $scope.sessionLevel = level.data.message;
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
        }

        //--
        $scope.controller = "compraFillController";
        //--
        $scope.mensaje = "";
        $scope.fallo = false;
        $scope.hecho = false;
        //--
        $scope.crear = function (numero) {
            promesasService.ajaxFill('compra', numero).then(function (response) {
                if (response.data.status == 200) {
                    $scope.fallo = false;
                    $scope.hecho = true;
                    $scope.mensaje = "Se han insertado todos los registros.";
                } else {
                    $scope.fallo = true;
                    $scope.hecho = true;
                    $scope.mensaje = "No se ha podido realizar la operación.";
                }
            }, function () {
                $scope.fallo = true;
                $scope.hecho = true;
                $scope.mensaje = "No se ha podido realizar la operación.";
            });
        }
        //--
        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };


    }

)