var miControlador = miModulo.controller(
    "carritoViewController",

        function ($scope, $routeParams, promesasService,auth) {
 
            if (auth.data.status != 200) {
                $location.path('/login');
            } else {
                $scope.authStatus = auth.data.status;
                $scope.authUsername = auth.data.message;
            }

            promesasService.ajaxGet('carrito', $routeParams.id)
                .then(function (response) {
                    $scope.id = response.data.message.id;
                    $scope.titulo = response.data.message.titulo;
                    $scope.cuerpo = response.data.message.cuerpo;
                    $scope.etiquetas = response.data.message.etiquetas;
                }, function () {
                    $scope.fallo = true;
                })
        }
)
