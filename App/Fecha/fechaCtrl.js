﻿ligaFepuseApp.controller('fechaCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    ngTableParams, fechaDataFactory, listPartidos,
    listEquipos, listArbitros,torneoDataFactory, infoTorneo, sedeDataFactory, listSedes) {
    //#region fpaz: Inicializacion de Variables de Scope
    $scope.listPartidos = listPartidos; //fpaz: tiene todos los partidos de la fecha
    $scope.listEquipos = listEquipos; //fpaz: tiene todos los equipos del torneo al que pertenece la fecha
    $scope.listArbitros = listArbitros; //fpaz: listado de arbitros de la liga
    $scope.torneo = infoTorneo;
    $scope.partido = {};
    $scope.partidosCargados = []; // fpaz: array de partidos agregados en el alta de fechas o en el alta de partidos para una fecha
    $scope.listSedes = listSedes;
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
            p.Dia = $scope.partidosCargados[x].Dia;
            hora = $scope.partidosCargados[x].Hora.getHours().toString();
            minutos = $scope.partidosCargados[x].Hora.getMinutes().toString();
            p.Hora = hora.concat(":", minutos);
            p.SedeId = $scope.partidosCargados[x].Sede.Id;
            p.GolesLocal = 0;
            p.GolesVisitante = 0;
            p.EquipoLocalId = $scope.partidosCargados[x].EquipoLocal.Id;
            p.EquipoVisitanteId = $scope.partidosCargados[x].EquipoVisitante.Id;
            p.ArbitroId = $scope.partidosCargados[x].Arbitro.Id;
            
            fecha.Partidos.push(p);
        }

        fechaDataFactory.postFecha(fecha).then(function (response) {
            var torneoActualizado = [];
            // una ves que agrego una fecha al torneo vuelvo a traer la info del torneo con las fechas actualizadas
            torneoDataFactory.getTorneo($stateParams.torneoId).then(function (response) {
                torneoActualizado = response;
                alert("Nueva Fecha Guardada");
                $mdDialog.hide(torneoActualizado);
            },
            function (err) {
                if (err) {
                    $scope.error = err;
                    alert("Error al recuperar las fechas del Torneo: " + $scope.error.Message);
                }
            })           
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
