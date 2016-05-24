ligaFepuseApp.controller('jugadorCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    torneoDataFactory, equipoDataFactory, jugadorDataFactory, profesionDataFactory,
    equipoInfo, profesionesList, jugadoresPorCategoriaList) { //torneosList, equiposLiga,, categoriasList
    // equipoInfo,  

    //#region control ng-table
   
    $scope.filter = [{
        show: false
    }];
    $scope.jugadoresCount = 0; //jugadoresList.length;
    $scope.query = {
        filter: '',
        limit: '5',
        page: 1
    };
    //#endregion

    //$scope.torneosList = torneosList; // iafar: no es necesaria la lista de torneos segun la categoria 
    $scope.equipoInfo = equipoInfo;
    //$scope.jugadoresList = jugadoresList; //iafar: traer todos los jugadores del ultimo torneo
    $scope.profesionesList = profesionesList;
    //$scope.categoriasList = categoriasList;
    $scope.jugadoresPorCategoriaList = jugadoresPorCategoriaList;
    $scope.jugador = [];

    //$scope.busProf = function (idProf) {
    //    for (i in profesionesList) {
    //        if (profesionesList[i].Id == idProf) {
    //            return profesionesList[i].Nombre;
    //            break;
    //        }

    //    }
    //}
    $scope.jugadoresLiga = function () {
        $mdDialog.show({
            //scope: $scope,
            //controller: DialogJugadorController,
            //targetEvent: $event,
            templateUrl: 'App/Jugador/Partials/JugadoresList.html',
            onComplete: afterShowAnimation
            //locals: {
            //    jugadorShow: jugadorSelect,
            //    edit: true,
            //    func: "Informacion de ",
            //    equipoId: $scope.equipoInfo.Id,
            //    torneoId: $scope.torneoInfo.Id,
            //    equiposList: $scope.torneoInfo.EquipoTorneos,
            //    profesionesList: $scope.profesionesList
            //} //paso de scope
        }).then(function (response) {
            if (response == "ok") { //iafar: se modifico jugador?

        //        jugadorDataFactory.getJugadoresEquipoTorneo(torneoInfo.Id, equipoInfo.Id).then(function (response2) {
        //            $scope.jugadoresList = response2;
        //            $scope.jugadoresCount = jugadoresList.length;
        //        },
        //function (err) {
        //    if (err) {
        //        $scope.error = err;
        //        alert("Error: " + $scope.error.Message);
        //    }
        //});
            } else {
                alert('Le dio a cancelar ' + response)
            }
        })
    }


    $scope.jugadorInfo = function (jugadorSelect) {
        $mdDialog.show({
            //scope: $scope,
            controller: DialogJugadorController,
            //targetEvent: $event,
            templateUrl: 'App/Jugador/Partials/jugadorInfo.html',
            onComplete: afterShowAnimation,
            locals: {
                jugadorShow: jugadorSelect,
                edit: true,
                func: "Informacion de ",
                equipoId: $scope.equipoInfo.Id,
                //torneoId: $scope.torneoInfo.Id, //iafar: ya no necesito saber el torneo
                //equiposList: $scope.torneoInfo.EquipoTorneos, //iafar: esto hacerlo desde el controller de la vista
                profesionesList: $scope.profesionesList
            } //paso de scope
        }).then(function (response) {
            if (response == "ok") { //iafar: se modifico jugador?
                
                jugadorDataFactory.getJugadoresEquipoTorneo(torneoInfo.Id, equipoInfo.Id).then(function (response2) {
                    $scope.jugadoresList = response2;
                    $scope.jugadoresCount = jugadoresList.length;
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

    $scope.jugadorAdd = function (jugadorSelect) {
        $mdDialog.show({
            //scope: $scope,
            controller: DialogJugadorController,
            //targetEvent: $event,
            templateUrl: 'App/Jugador/Partials/jugadorInfo.html',
            onComplete: afterShowAnimation,
            //equiposLiga: equiposLiga,
            locals: {
                jugadorShow: new Object(),
                edit: false,
                func: "Nuevo",
                equipoId: $scope.equipoInfo.Id,
                //torneoId: $scope.torneoInfo.Id,
                //equiposList: $scope.torneoInfo.EquipoTorneos,
                profesionesList: $scope.profesionesList
            } //paso de scope
        }).then(function (response) {
            if (response == "ok") { //iafar: se guardo nuevo jugador?
                jugadorDataFactory.getJugadoresEquipoTorneo(torneoInfo.Id, equipoInfo.Id).then(function (response2) {
                    $scope.jugadoresList = response2;
                    $scope.jugadoresCount = jugadoresList.length;
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

    // Cuando termina la animacion
    function afterShowAnimation(scope, element, options) {
        // post-show code here: DOM element focus, etc.

    }

});


function DialogJugadorController($scope, $mdDialog, jugadorShow, edit, func, equipoId,
      profesionesList, equipoDataFactory, jugadorDataFactory, equipoTorneoDataFactory,
    profesionDataFactory, imagenesDataFactory) {
    //no uso: torneoId, equiposList,, equiposLiga
    //#region inicializacion de scope
    
    $scope.jugador = jugadorShow;
    //$scope.equiposList = equiposList; //iafar: el jugador no cambia de equipo desde aqui
    $scope.edit = edit; //iafar: indica si los campos estan habilitados para edicion o no
    $scope.func = func; //iafar: cadena que expresa que tipo de operacion hara el modal
    $scope.equipoId = equipoId;
    $scope.profesionList = profesionesList;
    //$scope.equiposLiga = equiposLiga;
    //#endregion


    $scope.closeDialog = function (response) {
        //$scope.jugador.imagen = "";
        
        $mdDialog.hide(response);

    };

    $scope.editJugador = function () {
        $scope.edit = false;
        $scope.func = "Edicion de "
    }

    $scope.guardarJugador = function () {


        if ($scope.func == "Nuevo") {
            //iafar: nuevo jugador

            //#region datos de modelo         
            $scope.jugador.EquiposJugadorTorneos = [{
                EquipoId: equipoId,
                TorneoId: torneoId
            }];
            //#endregion

            jugadorDataFactory.postJugador($scope.jugador).then(function (response) {
                if ($scope.jugador.imagen != null) {
                    var jugadorId= response.data.Id
                    if (cargaLogo($scope.jugador.imagen, jugadorId)) {
                        //torneos = torneoDataFactory.getTorneos();
                        //$mdDialog.hide(torneos);                    
                    } else {
                        alert("Nuevo Jugador guardado, Sin Logo");
                    }
                } else {
                    alert("Nuevo jugador guardado, Sin Logo");
                }
            },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error al Guardar el Jugador: " + $scope.error.Message);
            }
        });

        } else {
            //iafar: se modifica un jugador
            console.log("se modificaron datos basicos jugador")
            jugadorDataFactory.putJugador($scope.jugador.Id, $scope.jugador)
            if (equipoId != $scope.equipoId) {
                //iafar: se cambio de equipo
                console.log("se modifico equipo")
               
            }




        }
        $scope.closeDialog("ok");
    }

    //#region fpaz: carga una imagen al azure
    var cargaLogo = function (file, idJugador) {
        var res = true;
        
        imagenesDataFactory.postImagen(file).then(function (response) {
            //fpaz: imagen cargada en el azure correctamente      
            
            $scope.prmImagen = response[0];
            var imagen = $scope.prmImagen;
            imagen.PersonaId = idJugador;
            console.log(imagen);
            //fpaz: guardo los datos de la imagen en la bd y la asocio con el torneo
            jugadorDataFactory.postImagenJugador(imagen).then(function (response) {
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

