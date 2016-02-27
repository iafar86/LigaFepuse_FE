ligaFepuseApp.controller('jugadorCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    torneoInfo, equipoInfo, torneoDataFactory, equipoDataFactory, jugadorDataFactory, jugadoresList, profesionDataFactory) {
    
   
    $scope.torneoInfo = torneoInfo;
    $scope.equipoInfo = equipoInfo;
    $scope.jugadoresList = jugadoresList;
    
    $scope.jugador = [];
   // $scope.jugador.FichaMedica = "No";
    //$scope.jugador.Federado = "No";
   

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
                equiposList: $scope.torneoInfo.EquipoTorneos
            } //paso de scope
        }).then(function (response) {
            if (response=="ok") { //iafar: se guardo nuevo jugador?
                alert('Edito un jugador, actualizar lista '+ response)
            } else {
                alert('Le dio a cancelar '+ response)
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
                equiposList: $scope.torneoInfo.EquipoTorneos
            } //paso de scope
        }).then(function (response) {
            if (response=="ok") { //iafar: se guardo nuevo jugador?
                alert('guardo un jugador, actualizar lista ' + response)
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
    torneoId, equiposList, equipoDataFactory, jugadorDataFactory, equipoTorneoDataFactory, profesionDataFactory) {

    //#region inicializacion de scope
    $scope.jugador = jugadorShow;
    $scope.equiposList = equiposList;
    $scope.edit = edit; //iafar: indica si los campos estan habilitados para edicion o no
    $scope.func = func;//iafar: cadena que expresa que tipo de operacion hara el modal
    $scope.equipoId = equipoId;
    $scope.profesionList = profesionDataFactory.query();
   
    //#endregion

   
    $scope.closeDialog = function (response) {

        $mdDialog.hide(response);

    };

    $scope.editJugador = function() {
        $scope.edit = false;
        $scope.func="Edicion de "
    }

    $scope.guardarJugador = function () {


        if($scope.func=="Nuevo"){
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
            if(equipoId != $scope.equipoId){
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

