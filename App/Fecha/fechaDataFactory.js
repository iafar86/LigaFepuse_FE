ligaFepuseApp.factory('fechaDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:50174/"; //desarrollo
    var fechaDataFactory = {};

var _getFechasTorneo = function (prmIdTorneo) { //iafar:trae la info de todas las fecha y los partidos de la fecha de un torneo            
        return $http.get(urlApi + 'api/FechasTorneo', { params: { prmIdTorneo: prmIdTorneo } }).then(
            function (response) {
                return response.data
            },
            function (response) {
                return response.data;
            });
    };
    var _getFecha = function (prmIdFecha) { //trae la info de la fecha y los partidos de la fecha para mostrarlos en el fixture            
        return $http.get(urlApi + 'api/Fechas/' + prmIdFecha).then(
            function (response) {                
                return response.data
            },
            function (response) {
                return response.data;
            });        
    };

    var _getPrimeraFecha = function (prmIdTorneo) { //trae la info de la fecha y los partidos de la fecha para mostrarlos en el fixture            
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Fechas/', { params: {prmIdTorneo:prmIdTorneo}} ).then(
            function (response) {                
                deferred.resolve(response.data);
            },
            function (err, status) {                
                deferred.reject(err.data);
            });
        return deferred.promise;
    };

    var _postFecha = function (data) { //alta de una Fecha
        var deferred = $q.defer();
        $http.post(urlApi + 'api/Fechas/', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    fechaDataFactory.getFecha = _getFecha;
    fechaDataFactory.getPrimeraFecha = _getPrimeraFecha;
    fechaDataFactory.postFecha = _postFecha;
	fechaDataFactory.getFechasTorneo = _getFechasTorneo;

    return fechaDataFactory;
});

