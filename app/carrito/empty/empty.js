var miControlador = miModulo.controller(
    "carritoEmptyController",

    function ($scope, $http, $routeParams, promesasService,auth) {
        
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
        }

        $scope.id = $routeParams.id;
        $scope.controller = "carritoEmptyController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        $scope.fecha = new Date();
        

        promesasService.ajaxGet('post', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.titulo = response.data.message.titulo;
                $scope.cuerpo = response.data.message.cuerpo;
                $scope.etiquetas = response.data.message.etiquetas;
                $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
            }, function () {
                $scope.fallo = true;
            })

        $scope.modificar = function () {

            const datos = {
                id: $routeParams.id,
                titulo: $scope.titulo,
                cuerpo: $scope.cuerpo,
                etiquetas: $scope.etiquetas,
                fecha: $scope.fecha
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };

            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxUpdate('post', { params: jsonToSend })
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho=true;
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
            promesasService.ajaxGet('post', $routeParams.id)
                .then(function (response) {
                    const respuesta = response.data.message;
                    $scope.titulo = respuesta.titulo;
                    $scope.cuerpo = respuesta.cuerpo;
                    $scope.etiquetas = respuesta.etiquetas;
                    $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
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