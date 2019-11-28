var miControlador = miModulo.controller(
    "facturaEditController",
    function ($scope, $http, $routeParams, promesasService, auth, $location) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
        }

        $scope.id = $routeParams.id;
        $scope.controller = "facturaEditController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        $scope.fecha = new Date();

        promesasService.ajaxGet('factura', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
                $scope.iva = response.data.message.iva;
                $scope.usuario_id = response.data.message.usuario_id;
            }, function () {
                $scope.fallo = true;
            })

        $scope.modificar = function () {

            const datos = {
                id: $routeParams.id,
                fecha: $scope.fecha,
                iva: $scope.iva,
                usuario_id: $scope.usuario_id,
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };

            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxUpdate('factura', { params: jsonToSend })
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        };

        $scope.volver = function () {
            window.history.back();
        };

        $scope.reset = function () {
            promesasService.ajaxGet('factura', $routeParams.id)
                .then(function (response) {
                    const respuesta = response.data.message;
                    $scope.id = response.data.message.id;
                    $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
                    $scope.iva = response.data.message.iva;
                    $scope.usuario_obj = response.data.message.usuario_obj;
                }, function (error) {
                    $scope.fallo = true;
                });
        }

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };

        $scope.reset();

    }
)