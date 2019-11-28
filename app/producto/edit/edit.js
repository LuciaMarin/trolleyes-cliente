var miControlador = miModulo.controller(
    "productoEditController",
    function ($scope, $http, $routeParams, promesasService, auth) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
        }

        $scope.id = $routeParams.id;
        $scope.controller = "productoEditController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        promesasService.ajaxGet('producto', $routeParams.id)
            .then(function (response) {
                $scope.codigo = response.data.message.codigo;
                $scope.existencias = response.data.message.existencias;
                $scope.precio = response.data.message.precio;
                $scope.imagen = response.data.message.imagen;
                $scope.descripcion = response.data.message.descripcion;
                $scope.tipo_producto_id = response.data.message.tipo_producto_obj.id;
            }, function () {
                $scope.fallo = true;
            })

        $scope.modificar = function () {
            const datos = {
                id: $routeParams.id,
                codigo: $scope.codigo,
                existencias: $scope.existencias,
                imagen: $scope.imagen,
                precio: $scope.precio,
                descripcion: $scope.descripcion,
                tipo_producto_id: $scope.tipo_producto_obj.id
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };

            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxUpdate('producto', {
                params: jsonToSend
            })
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

        $scope.reset = function () {
            promesasService.ajaxGet('producto', $routeParams.id)
                .then(function (response) {
                    const respuesta = response.data.message;
                    $scope.id = response.data.message.id;
                    $scope.codigo = response.data.message.codigo;
                    $scope.existencias = response.data.message.existencias;
                    $scope.precio = response.data.message.precio;
                    $scope.imagen = response.data.message.imagen;
                    $scope.descripcion = response.data.message.descripcion;
                    $scope.tipo_producto_obj = response.data.message.tipo_producto_obj.descripcion;

                }, function (error) {
                    $scope.fallo = true;
                });
        }

        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };

        $scope.reset();
    }
)