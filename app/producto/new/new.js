var miControlador = miModulo.controller(
    "productoNewController",

    function ($scope, $http, $location, promesasService, auth,$routeParams) {
        
        if (auth.data.status != 200 || auth.data.message.tipo_usuario_obj.id == 2) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        $scope.controller = "productoNewController";
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
                codigo: $scope.codigo,
                existencias: $scope.existencias,
                precio: $scope.precio,
                imagen: $scope.imagen,
                descripcion: $scope.descripcion,
                tipo_producto_id: $scope.tipo_producto_obj.id
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxNew('producto', { params: jsonToSend })
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

        $scope.tipoProductoRefresh = function (f, consultar) {
            var form = f;
            if ($scope.tipo_producto_obj.id != null) {
                if (consultar) {
                    promesasService.ajaxGet('producto', $routeParams.id)
                        .then(function (response) {
                            $scope.tipo_producto_obj = response.data.message;
                            form.userForm.tipo_producto_obj.$setValidity('valid', true);
                        }, function () {
                            form.userForm.tipo_producto_obj.$setValidity('valid', false);
                        });
                } else {
                    form.userForm.tipo_producto_obj.$setValidity('valid', true);
                }
            } else {
                $scope.tipo_producto_obj.desc = "";
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