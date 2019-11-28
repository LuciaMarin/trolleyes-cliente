var miControlador = miModulo.controller(
    "facturaNewController",
    function ($scope, $http, $location, promesasService, auth) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
        }

        $scope.controller = "facturaNewController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        promesasService.ajaxCheck()
            .then(function (response) {
                if (response.data.status == 200) {
                    $scope.session = true;
                    $scope.usuario = response.data.message;
                } else {
                    $scope.session = false;
                }
            }, function (response) {
                $scope.session = false;
            })

        $scope.new = function () {
            const datos = {
                fecha: $scope.fecha,
                iva: $scope.iva,
                usuario_id: $scope.usuario_obj.id
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxNew('factura', {
                params: jsonToSend
            })
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.response;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                    $scope.hecho = true;
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        }

        $scope.tipoUsuarioRefresh = function (f, consultar) {
            var form = f;
            if ($scope.usuario_obj.id != null) {
                if (consultar) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=' + $scope.tipo_usuario_obj.id
                    }).then(function (response) {
                        $scope.usuario_obj = response.data.message;
                        form.userForm.usuario_obj.$setValidity('valid', true);
                    }, function () {
                        form.userForm.usuario_obj.$setValidity('valid', false);
                    });
                } else {
                    form.userForm.usuario_obj.$setValidity('valid', true);
                }
            } else {
                $scope.usuario_obj.desc = "";
            }
        };
        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };
    }
)