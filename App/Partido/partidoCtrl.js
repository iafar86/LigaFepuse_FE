ligaFepuseApp.controller('partidoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia, ngTableParams, partidoDataFactory,
    listPartidos, listEquipos, listArbitros, infoTorneo, infoPartido) {
    //#region fpaz: Inicializacion de Variables de Scope
    $scope.listPartidos = listPartidos; //fpaz: tiene todos los partidos de la fecha
    $scope.listEquipos = listEquipos; //fpaz: tiene todos los equipos del torneo al que pertenece la fecha
    $scope.listArbitros = listArbitros; //fpaz: listado de arbitros de la liga
    $scope.torneo = infoTorneo;
    $scope.fecha = {};
    $scope.partido = infoPartido;
    $scope.init = function () { //fpaz: funcion para cargar el objeto fecha a partir del id de fecha pasado como parametro en el stae        
        for (var i = 0; i < infoTorneo.Fechas.length; i++) {            
            if (infoTorneo.Fechas[i].Id == $stateParams.fechaId) {
                $scope.fecha = infoTorneo.Fechas[i];                
                break;
            }
        }
    };
    $scope.editValue = false; // variable que voy a usarpara activar y desactivar los modos de edicion para hacer el update de la info    
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

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    //#endregion

    

    //fpaz: funcion para limpiar el model de la vista
    $scope.limpiar = function () {
        $scope.partido = {};
    }

    //#region modificacion de partido
    $scope.fechaHoraNueva = {};
    $scope.edit = function () {//fpaz: activa el modo de edicion de los campos        
        $scope.editValue = true;                
    };

    $scope.saveUpdate = function () {//fpaz: guarda los cambios y llama a la funcion put de la api        
        var partidoMod = {};
        partidoMod = $scope.partido;
        delete partidoMod.Fecha;
        delete partidoMod.EquipoLocal;
        delete partidoMod.EquipoVisitante;
        delete partidoMod.Arbitro;

        if ($scope.fechaHoraNueva != null) {
            partidoMod.DiaYHora = $scope.fechaHoraNueva;
        }

        console.log(partidoMod);

        partidoDataFactory.putPartido(partidoMod.Id, partidoMod).then(function (response) {
            $scope.editValue = false;
            alert("Cambios Guardados Correctamente");
            $scope.obtenerPartido();
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 $scope.cancel();
                 alert("Error al Modificar la Información: " + $scope.error.Message);                 
             }
         });
    };

    $scope.removeJugadorLocal = function (jugador) { // elimina un jugador del partido
        var index = $scope.partido.JugadoresDelPartido.indexOf(jugador);
        $scope.partido.JugadoresDelPartido.splice(index, 1);

        var indexJugL = $scope.partido.EquipoLocal.PartidosJugadores.indexOf(jugador)
        $scope.partido.EquipoLocal.PartidosJugadores.splice(indexJugL, 1);
        
    }

    $scope.removeJugadorVisitante = function (jugador) { // elimina un jugador del partido
        var index = $scope.partido.JugadoresDelPartido.indexOf(jugador);
        $scope.partido.JugadoresDelPartido.splice(index, 1);

        var indexJugV = $scope.partido.EquipoVisitante.PartidosJugadores.indexOf(jugador)
        $scope.partido.EquipoVisitante.PartidosJugadores.splice(indexJugV, 1);

    }
    
    $scope.saveEditJugadorLocal = function (jugador) { // modifica los datos un jugador del partido        
        for (var i = 0; i < $scope.partido.JugadoresDelPartido.length; i++) {
            if ($scope.partido.JugadoresDelPartido[i].Id == jugador.Id) {
                //actualizo las estadisticas del jugador
                $scope.partido.JugadoresDelPartido[i].Goles = jugador.Goles;
                $scope.partido.JugadoresDelPartido[i].TarjetasAmarillas = jugador.TarjetasAmarillas;
                $scope.partido.JugadoresDelPartido[i].TarjetasRojas = jugador.TarjetasRojas;
                break;
            }
        }

        //actualizo los goles del equipo
        $scope.partido.GolesLocal += jugador.Goles;
    }

    $scope.saveEditJugadorVisitante = function (jugador) { // modifica los datos un jugador del partido        
        for (var i = 0; i < $scope.partido.JugadoresDelPartido.length; i++) {
            if ($scope.partido.JugadoresDelPartido[i].Id == jugador.Id) {
                //actualizo las estadisticas del jugador
                $scope.partido.JugadoresDelPartido[i].Goles = jugador.Goles;
                $scope.partido.JugadoresDelPartido[i].TarjetasAmarillas = jugador.TarjetasAmarillas;
                $scope.partido.JugadoresDelPartido[i].TarjetasRojas = jugador.TarjetasRojas;
                break;
            }
        }

        //actualizo los goles del equipo        
        $scope.partido.GolesVisitante += jugador.Goles;
    }

    $scope.cancelEdit = function () {
        $scope.editValue = false;
        $scope.obtenerPartido();
    }

    $scope.obtenerPartido = function () {
        partidoDataFactory.getPartido($scope.partido.Id).then(function (response) {
            $scope.partido = response;            
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error: " + $scope.error.Message);
             }
         });
    }
    //#endregion

    
})
