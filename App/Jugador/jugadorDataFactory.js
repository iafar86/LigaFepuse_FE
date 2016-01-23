ligaFepuseApp.factory('jugadorDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:50174"; //desarrollo
    var equipoDataFactory = {};

    var _getJugadoresEquipo = function () { // trae todos los jugadores de un equipo
        var deferred = $q.defer();
        return $http.get(urlApi + 'api/Jugadors', {
            params: {
                prmIdEquipo: 1
            }
        }).then(
        function (response) {
            deferred.resolve(response);
        },
        function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;

    };

    var _getJugadores = function () { //trae todos los jugadores de un torneo
        return $http.get(urlApi + '/api/Equipoes', {
            params: {
                prmIdLiga: 1,
                prmIdTorneo: prmTorneo
            }
        }).then(
        function (response) {
            deferred.resolve(response);
        },
        function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;

    };

    var _getEquipo = function (prmEquipo) { //trae un equipo
        var deferred = $q.defer();
        $http.get(urlApi + '/api/Equipoes').then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;

    };

    var _postEquipo = function (data) { // post de un equipo
        return $http.post(urlApi + '/api/Equipoes', data).then(function (response) {
            return response;
        })
    };

    var _putEquipo = function (prmId, data) {
        var deferred = $q.defer();

        $http.put(urlApi + '/api/Equipoes' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    equipoDataFactory.getEquipos = _getEquipos;
    equipoDataFactory.getEquipo = _getEquipo;
    equipoDataFactory.getEquiposLiga = _getEquiposLiga;
    equipoDataFactory.postEquipo = _postEquipo;
    equipoDataFactory.putEquipo = _putEquipo;

    return equipoDataFactory;


})