ligaFepuseApp.controller('fechaCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia, ngTableParams, fechaDataFactory, listPartidos, listEquipos, listArbitros, infoTorneo) {
    //#region fpaz: Inicializacion de Variables de Scope
    $scope.listPartidos = listPartidos; //fpaz: tiene todos los partidos de la fecha
    $scope.listEquipos = listEquipos; //fpaz: tiene todos los equipos del torneo al que pertenece la fecha
    $scope.listArbitros = listArbitros; //fpaz: listado de arbitros de la liga
    $scope.torneo = infoTorneo;
    $scope.partido = {};
    $scope.partidosCargados = []; // fpaz: array de partidos agregados en el alta de fechas o en el alta de partidos para una fecha
    //#endregion

    //#region fpaz: Alta de Fechas del Torneo
    //#region fpaz: funciones para agregar partidos antes de la carga en la bd
    $scope.agregarPartido = function (prmPartido) {
        console.log("Entro a Agregar Partido");
        $scope.partidosCargados.push(prmPartido);
        $scope.limpiar();
    }

    $scope.cancelarPartido = function () {
        $scope.limpiar();
    }
    //#endregion

    //fpaz: funcion para dar de alta una fecha y sus partidos correspondientes en la bd
    $scope.fechaAdd = function () {
        var fecha = {};
        fecha.NumFecha = $scope.fecha.NumFecha;
        fecha.torneoId = $scope.torneo.Id;
        fecha.Partidos = [];

        //fpaz: armo el array de partidos
        var x;
        for (x in $scope.partidosCargados) {
            var p = {};
            p.DiaYHora = $scope.partidosCargados[x].DiaYHora;
            p.Sede = $scope.partidosCargados[x].Sede;
            p.GolesLocal = 0;
            p.GolesVisitante = 0;
            p.EquipoLocalId = $scope.partidosCargados[x].EquipoLocal.Id;
            p.EquipoVisitanteId = $scope.partidosCargados[x].EquipoVisitante.Id;
            p.ArbitroId = $scope.partidosCargados[x].Arbitro.Id;
            
            fecha.Partidos.push(p);
        }

        fechaDataFactory.postFecha(fecha).then(function (response) {
            alert("Nueva Fecha Guardada");
            $mdDialog.hide();
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error al Guardar LA Nueva Fecha: " + $scope.error.Message);
             }
         });
    }
    //#endregion

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    //fpaz: funcion para limpiar el model de la vista
    $scope.limpiar = function () {        
        $scope.partido = {};        
    }
    
})
