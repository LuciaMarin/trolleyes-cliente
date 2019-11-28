var miControlador = miModulo.controller(
    "homeController",
    function ($scope, $routeParams, $window, $location, promesasService, auth) {
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel = auth.data.message.tipo_usuario_obj;
        $scope.controller = "homeController";
        $scope.campo = $routeParams.order;
        $scope.direction = $routeParams.direction;

        if (!$routeParams.page) {
            $scope.paginaActual = 1;
        } else {
            $scope.paginaActual = parseInt($routeParams.page);
        }
        if (!$routeParams.rpp) {
            $scope.rppActual = 10;
        } else {
            $scope.rppActual = parseInt($routeParams.rpp);
        }

        promesasService.ajaxGetPage('producto', $scope.rppActual, $scope.paginaActual)
            .then(function (response) {
                $scope.status = response.data.status;
                $scope.pagina = response.data.message;
            }, function () {
            })

        promesasService.ajaxGetCount('producto')
            .then(function (response) {
                $scope.status = response.data.status;
                $scope.numRegistros = response.data.message;
                $scope.numPaginas = Math.ceil($scope.numRegistros / $scope.rppActual);

                paginacion(2);
                if ($scope.paginaActual > $scope.numPaginas) {
                    $window.location.href = `#!/home/${$scope.rppActual}/${$scope.numPaginas}`;
                } else if ($routeParams.page < 1) {
                    $window.location.href = `#!/home/${$scope.rppActual}/1`;
                }
            }, function () {
            })

        function paginacion(vecindad) {
            vecindad++;
            $scope.botonera = [];
            for (i = 1; i <= $scope.numPaginas; i++) {
                if (i == 1) {
                    $scope.botonera.push(i);
                } else if (i > ($scope.paginaActual - vecindad) && i < ($scope.paginaActual + vecindad)) {
                    $scope.botonera.push(i);
                } else if (i == $scope.numPaginas) {
                    $scope.botonera.push(i);
                } else if (i == ($scope.paginaActual - vecindad) || i == ($scope.paginaActual + vecindad)) {
                    $scope.botonera.push('...');
                }
            }
        }

    }
)