var miControlador = miModulo.controller(
    "compraPlist3Controller",

    function ($scope, $routeParams, $http, promesasService, $window, auth, $location) {
        if (auth.data.status != 200 || (auth.data.message.id != $routeParams.id && auth.data.message.tipo_usuario_obj.id != 1)) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        $scope.controller = "compraPlist3Controller";
        $scope.paginaActual = parseInt($routeParams.page);
        $scope.rppActual = parseInt($routeParams.rpp);
        $scope.rppS = [10, 50, 100];;
        $scope.id = $routeParams.id;
        $scope.objeto = $routeParams.filter;

        request = "http://localhost:8081/trolleyes/json?ob=compra&op=getpage&rpp=" + $scope.rppActual + "&page=" + $scope.paginaActual + "&id=" + $scope.id + "&filter=" + $scope.objeto;
        
        promesasService.ajaxGetPage('compra', $scope.rppActual, $scope.paginaActual,  $scope.id, $scope.objeto)
        .then(function (response) {
            $scope.status = response.data.status;
            $scope.pagina = response.data.message;
            $scope.link_producto = response.data.message[0].producto_obj.id;
        });

        $scope.showSelectValue = function (mySelect) {
            $window.location.href = `/trollEyes-client/#!/compra/plist/` + mySelect + `/1`;
        }

        $scope.search = function () {
            promesasService.ajaxSearch('compra', $scope.rppActual, $scope.paginaActual, $scope.word)
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;

                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                        $scope.pagina = response.data.message;
                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        }
        promesasService.ajaxGetCountFilter('compra', $scope.id_producto, "producto")
            .then(function (response) {
                $scope.status = response.data.status;
                $scope.numRegistros = response.data.message;
                $scope.numPaginas = Math.ceil($scope.numRegistros / $routeParams.rpp);
                $scope.calcPage = [];
                for (const p of $scope.rppS) {
                    const res = $scope.paginaActual / $scope.numPaginas;
                    const next = Math.ceil($scope.numRegistros / p);
                    $scope.calcPage.push(Math.ceil(res * next));
                }
                paginacion(2);
                if ($scope.paginaActual > $scope.numPaginas) {
                    $window.location.href = `#!/home/${$scope.rppActual}/${$scope.numPaginas}`;
                } else if ($routeParams.page < 1) {
                    $window.location.href = `#!/home/${$scope.rppActual}/1`;
                }
            })
        promesasService.ajaxListCarrito()
            .then(function successCallback(response) {
                if (response.data.status != 200) {
                    $scope.falloMensaje = response.data.message;
                } else {
                    $scope.status = response.data.status;
                    $scope.pagina = response.data.message;
                    if (response.data.message) {
                        if (response.data.message.length == 0) {
                            $scope.count = 0;
                        } else {
                            $scope.count = response.data.message.length;
                        }
                    } else {
                        $scope.count = 0;
                    }
                }
            }, function (response) {
                $scope.mensaje = "Ha ocurrido un error";
            });

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