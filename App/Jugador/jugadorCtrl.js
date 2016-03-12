ligaFepuseApp.controller('jugadorCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    torneoInfo, equipoInfo, jugadoresList, profesionesList, torneoDataFactory, profesionDataFactory, equipoDataFactory, jugadorDataFactory) {


    //#region prueba tabla
   
    $scope.filter = [{
        show: false
    }];
    $scope.jugadoresCount = jugadoresList.length;
    $scope.query = {
        filter: '',
        limit: '5',
        page: 1
    };
    //#endregion

    $scope.torneoInfo = torneoInfo;
    $scope.equipoInfo = equipoInfo;
    $scope.jugadoresList = jugadoresList;
    $scope.profesionesList = profesionesList;

    $scope.jugador = [];

    $scope.busProf = function (idProf) {
        for (i in profesionesList) {
            if (profesionesList[i].Id == idProf) {
                return profesionesList[i].Nombre;
                break;
            }

        }
    }
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
                torneoId: $scope.torneoInfo.Id,
                equiposList: $scope.torneoInfo.EquipoTorneos,
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
            locals: {
                jugadorShow: new Object(),
                edit: false,
                func: "Nuevo",
                equipoId: $scope.equipoInfo.Id,
                torneoId: $scope.torneoInfo.Id,
                equiposList: $scope.torneoInfo.EquipoTorneos,
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
    torneoId, equiposList, profesionesList, equipoDataFactory, jugadorDataFactory, equipoTorneoDataFactory, profesionDataFactory) {

    //#region inicializacion de scope
    $scope.jugador = jugadorShow;
    $scope.equiposList = equiposList;
    $scope.edit = edit; //iafar: indica si los campos estan habilitados para edicion o no
    $scope.func = func;//iafar: cadena que expresa que tipo de operacion hara el modal
    $scope.equipoId = equipoId;
    $scope.profesionList = profesionesList;

    //#endregion


    $scope.closeDialog = function (response) {

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
            //$scope.jugador.Profesion = "Profesion Prueba"           
            $scope.jugador.EquiposJugadorTorneos = [{
                EquipoId: equipoId,
                TorneoId: torneoId
            }];


            //#endregion

            jugadorDataFactory.postJugador($scope.jugador);//iafar: trabajar con un promise

        } else {
            //iafar: se modifica un jugador
            console.log("se modificaron datos basicos jugador")
            jugadorDataFactory.putJugador($scope.jugador.Id, $scope.jugador)
            if (equipoId != $scope.equipoId) {
                //iafar: se cambio de equipo
                console.log("se modifico equipo")
                var ejtId = jugadorShow.EquiposJugadorTorneos[0].Id;
                jugadorShow.EquiposJugadorTorneos[0].EquipoId = $scope.equipoId;
                jugadorDataFactory.putEquipoJugadorTorneo(ejtId, jugadorShow.EquiposJugadorTorneos[0]);
            }




        }
        $scope.closeDialog("ok");
    }


}

