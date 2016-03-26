ligaFepuseApp.controller('arbitroCtrl', function ($scope, $stateParams,$mdDialog, arbitroDataFactory, arbitroList) {
    $scope.arbitroList = arbitroList;
    //#region Inicializacion de Variables de Scope
    
    //#endregion

    $scope.arbitroAdd = function () {
        $mdDialog.show({
            //scope: $scope,
            controller: DialogArbitroController,
            //targetEvent: $event,
            templateUrl: 'App/Arbitro/Partials/arbitroInfo.html',
            locals: {
                arbitroShow: new Object(),
                edit: false,
                func: "Nuevo"
            } //paso de scope
        }).then(function (response) {
            if (response == "ok") { //iafar: se guardo nuevo arbitro?
                //alert('guardo un arbitro, actualizar lista ' + response);
                arbitroDataFactory.getArbitros().then(function (response) {
                    $scope.arbitroList = response;
                },
                function (err) {
                    if (err) {
                        $scope.error = err;
                        alert("Error: " + $scope.error.Message);
                    }
                });
            } else {
                alert('Le dio a cancelar ' + response)
            }
        })
    }

    $scope.arbitroInfo = function (arbitroSelect) {
        $mdDialog.show({
            //scope: $scope,
            controller: DialogArbitroController,
            //targetEvent: $event,
            templateUrl: 'App/Arbitro/Partials/arbitroInfo.html',
            locals: {
                arbitroShow: arbitroSelect,
                edit: true,
                func: "Informacion de "
            } //paso de scope
        }).then(function (response) {
            if (response == "ok") { //iafar: se guardo nuevo arbitro?
                alert('Edito un jugador, actualizar lista ' + response)
            } else {
                alert('Le dio a cancelar ' + response)
            }
        })
    }




})

function DialogArbitroController($scope, $mdDialog, arbitroShow, edit, func,
    arbitroDataFactory, imagenesDataFactory) {

    //#region inicializacion de scope
    $scope.arbitro = arbitroShow;
    $scope.arbitro.LigaId = 1;
    $scope.edit = edit; //iafar: indica si los campos estan habilitados para edicion o no
    $scope.func = func;//iafar: cadena que expresa que tipo de operacion hara el modal

    //#endregion


    $scope.closeDialog = function (response) {

        $mdDialog.hide(response);

    };

    $scope.editArbitro = function () {
        $scope.edit = false;
        $scope.func = "Edicion de "
    }

    $scope.guardarArbitro = function () {


        if ($scope.func == "Nuevo") {
            //iafar: nuevo arbitro

            arbitroDataFactory.postArbitro($scope.arbitro).then(function (response) {
                
                if ($scope.arbitro.imagen != null) {
                    
                    var arbitroId = response.Id
                    if (cargaLogo($scope.arbitro.imagen, arbitroId)) {
                        //torneos = torneoDataFactory.getTorneos();
                        //$mdDialog.hide(torneos);                    
                    } else {
                        alert("Nuevo Arbitro guardado, Sin Logo");
                    }
                } else {
                    alert("Nuevo arbitro guardado, Sin Logo");
                }
            },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error al Guardar el arbitro: " + $scope.error.Message);
            }
        });

        } else {
            //iafar: se modifica un jugador
            arbitroDataFactory.putArbitro($scope.arbitro.Id, $scope.arbitro);

        }
        $scope.closeDialog("ok");
    }

    //#region fpaz: carga una imagen al azure
    var cargaLogo = function (file, idArbitro) {
        var res = true;
        
        imagenesDataFactory.postImagen(file).then(function (response) {
            //fpaz: imagen cargada en el azure correctamente      
            
            $scope.prmImagen = response[0];
            var imagen = $scope.prmImagen;
            imagen.PersonaId = idArbitro;
            console.log(imagen);
            //fpaz: guardo los datos de la imagen en la bd y la asocio con el torneo
            arbitroDataFactory.postImagenArbitro(imagen).then(function (response) {
                //fpaz: imagen cargada en la bd correctamente                      
                console.log("logo guardado en bd");
                alert("Imagen guardada en BD");
                res = true;
            },
            function (err) {
                if (err) {
                    $scope.error = err;
                    console.log("Error al Guardar el logo: " + $scope.error.Message);
                    res = false;
                }
            });
        },
        function (err) {
            if (err) {
                $scope.error = err;
                console.log("Error al Guardar el logo: " + $scope.error.Message);
                res = false;
            }
        });
        
        return res;
    }
    //#endregion




}
