ligaFepuseApp.controller('jugadorCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    torneoInfo, equipoInfo, torneoDataFactory, equipoDataFactory, jugadorDataFactory, jugadoresList) {
    
   
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
                var torneoId = $stateParams.idTorneo;
                var equipoId = $stateParams.idEquipo;
                jugadorDataFactory.getJugadoresEquipoTorneo(torneoId, equipoId).then(function (response) {
                    $scope.jugadoresList = response;
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

    //#region Imprimir listado
    $scope.printToCart = function (printSectionId) {

        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head> <link rel="stylesheet" href="libs/assets/animate.css/animate.css" type="text/css" /><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"><link rel="stylesheet" href="libs/angular/angular-loading-bar/build/loading-bar.css" type="text/css" /><link rel="stylesheet" href="libs/angular/angular-material/angular-material.css" type="text/css" /><link rel="stylesheet" href="styles/material-design-icons.css" type="text/css" /><link rel="stylesheet" href="styles/app.min.css" type="text/css" /><link href="libs/angular/angular-material/angular-material.min.css" rel="stylesheet" /><script src="libs/angular/angular-material/angular-material.min.js"></script><script src="libs/angular/angular-material-icons/angular-material-icons.min.js"></script><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }


    //#endRegion


});


function DialogJugadorController($scope, $mdDialog, jugadorShow, edit, func, equipoId,
    torneoId, equiposList , equipoDataFactory, jugadorDataFactory, equipoTorneoDataFactory) {

    //#region inicializacion de scope
    $scope.jugador = jugadorShow;
    $scope.equiposList = equiposList;
    $scope.edit = edit; //iafar: indica si los campos estan habilitados para edicion o no
    $scope.func = func;//iafar: cadena que expresa que tipo de operacion hara el modal
    $scope.equipoId = equipoId;
   
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
            $scope.jugador.Profesion = "Profesion Prueba"           
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

