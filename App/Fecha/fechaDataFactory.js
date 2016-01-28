ligaFepuseApp.factory('fechaDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:50174/"; //desarrollo
    var fechaDataFactory = {};

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
        return $http.get(urlApi + 'api/Fechas/', { params: {prmIdTorneo:prmIdTorneo}} ).then(
            function (response) {
                return response.data
            },
            function (response) {
                return response.data;
            });
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

    return fechaDataFactory;
});

