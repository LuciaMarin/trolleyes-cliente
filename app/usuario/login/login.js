var miControlador = miModulo.controller(
    "login",
    function ($scope, $location, promesasService, auth) {
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        $scope.controller = "login";
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
           
        }

        $scope.login = function () {
            if ($scope.username != undefined && $scope.password != undefined) {
                        promesasService.ajaxLogin($scope.username, $scope.password)
                            .then(function (response) {
                                if (response.data.status != 200) {
                                    $scope.fallo = true;
                                    $scope.falloMensaje = response.data.message;
                                } else {
                                    $scope.session = true;
                                    $scope.fallo = false;
                                    $location.path("/home/12/1");
                                }
                                $scope.hecho = true;
                            }, function (error) {
                                $scope.session = false;
                                $scope.hecho = true;
                                $scope.fallo = true;
                                $scope.falloMensaje = error.message + " " + error.stack;

                            });
            } else {
                $scope.fallo = true;
                $scope.falloMensaje = "Los campos no pueden estar vacios. ";
            }
        }
    }
)
