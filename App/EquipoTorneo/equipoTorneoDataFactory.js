ligaFepuseApp.factory('equipoTorneoDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:50174/"; //desarrollo
    var equipoTorneoDataFactory = {};

    var _getTablaPosiciones = function (prmIdTorneo) { //trae la info para la tabla de posiciones del torneo
        //var deferred = $q.defer();
        return $http.get(urlApi + 'api/EquipoTorneos/' + prmIdTorneo).then(
            function (response) {
                //deferred.resolve(response);
                return response.data
            },
            function (response) {
                return response.data
            });
        //return deferred.promise;
    };  

    var _putEquipoTorneo = function (data) { // fpaz: actualizacion de datos del equipo en el torneo, actuiliza la tabla con los puntos, goles, etc del equipo en el torneo
        var deferred = $q.defer();
        $http.put(urlApi + 'api/EquipoTorneos/' , data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                console.log("error en equipoTorneoDataFactory");
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    equipoTorneoDataFactory.getTablaPosiciones = _getTablaPosiciones;
    equipoTorneoDataFactory.putEquipoTorneo = _putEquipoTorneo;

    return equipoTorneoDataFactory;
});