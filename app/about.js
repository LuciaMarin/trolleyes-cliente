var miControlador = miModulo.controller(
    "aboutController",
    function ($scope, auth,$location) {
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel = auth.data.message.tipo_usuario_obj;
        $scope.controller = "aboutController";
        $scope.campo = $routeParams.order;
        $scope.direction = $routeParams.direction;

        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };

    }
)