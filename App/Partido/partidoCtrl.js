ligaFepuseApp.controller('partidoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia, ngTableParams, partidoDataFactory,
    listPartidos,listEquipos,listArbitros,infoTorneo) {
    //#region fpaz: Inicializacion de Variables de Scope
    $scope.listPartidos = listPartidos; //fpaz: tiene todos los partidos de la fecha
    $scope.listEquipos = listEquipos; //fpaz: tiene todos los equipos del torneo al que pertenece la fecha
    $scope.listArbitros = listArbitros; //fpaz: listado de arbitros de la liga
    $scope.torneo = infoTorneo;
    $scope.fecha = {};
    $scope.partido = {};
    $scope.init = function () { //fpaz: funcion para cargar el objeto fecha a partir del id de fecha pasado como parametro en el stae        
        for (var i = 0; i < infoTorneo.Fechas.length; i++) {            
            if (infoTorneo.Fechas[i].Id == $stateParams.fechaId) {
                $scope.fecha = infoTorneo.Fechas[i];                
                break;
            }
        }
    };
    //#endregion
    
    //#region fpaz: Alta de Fechas del Torneo
   

    //fpaz: funcion para dar de alta una fecha y sus partidos correspondientes en la bd
    $scope.partidoAdd = function (prmPartido) {
        
        //armo el obj partido que voy a dar de alta
        var p = {};
        p.FechaId = $stateParams.fechaId;
        p.DiaYHora = prmPartido.DiaYHora;
        p.Sede = prmPartido.Sede;
        p.GolesLocal = 0;
        p.GolesVisitante = 0;
        p.EquipoLocalId = prmPartido.EquipoLocal.Id;
        p.EquipoVisitanteId = prmPartido.EquipoVisitante.Id;
        p.ArbitroId = prmPartido.Arbitro.Id;        

        partidoDataFactory.postPartido(p).then(function (response) {
            alert("Nueva Partido Guardado");
            $mdDialog.hide(p.FechaId);
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error al Guardar El Partido: " + $scope.error.Message);
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
