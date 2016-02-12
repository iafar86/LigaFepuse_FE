﻿ligaFepuseApp.factory('jugadorDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:50174"; //desarrollo
    var jugadorDataFactory = {};

    var _getJugadoresLiga = function () { // trae todos los Jugadores de la liga
        var deferred = $q.defer();
        return $http.get(urlApi + '/api/Jugadors', {
            params: {
                prmIdLiga: 1
            }
        }).then(
        function (response) {
            console.log(response);            
            return response;

        },
        function (response) {

            deferred.reject(response.data);
        });
       return deferred.promise;

    };

    var _getJugadoresEquipoTorneo = function (prmIdTorneo, prmIdEquipo) { //trae todos los Jugadores de un torneo y de un equipo
        //var prmIdLiga = authSvc.authentication.ligaId;
        return $http.get(urlApi + '/api/Jugadors', {
            params: {
                prmIdTorneo: prmIdTorneo,
                prmIdEquipo: prmIdEquipo
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        });

    };


    var _getJugador = function (prmJugador) { //trae un Jugador
        var deferred = $q.defer();
        $http.get(urlApi + '/api/Jugadors/' + prmJugador).then(
            function (response) {
                console.log(response.data)
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;

    };



    var _postJugador = function (data) { // nuevo  jugador
        return $http.post(urlApi + '/api/Jugadors', data).then(function (response) {
                return response;
        })
    };

    var _putJugador = function (prmId, data) { // modifica un torneo
        var deferred = $q.defer();

        $http.put(urlApi + '/api/Jugadors/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _putEquipoJugadorTorneo = function (prmId, data) { // modifica la relacion de un jugador en un equipo segun torneo
        var deferred = $q.defer();

        $http.put(urlApi + '/api/EquipoJugadorTorneos/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };


   

   // jugadorDataFactory.getJugadores = _getJugadores;
    jugadorDataFactory.getJugadoresEquipoTorneo = _getJugadoresEquipoTorneo;
   // jugadorDataFactory.getEquiposLiga = _getJugadoresLiga;
    jugadorDataFactory.postJugador = _postJugador;
    jugadorDataFactory.putJugador = _putJugador;
    jugadorDataFactory.putEquipoJugadorTorneo = _putEquipoJugadorTorneo;

    return jugadorDataFactory;


})