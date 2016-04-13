ligaFepuseApp.factory('zonasDataFactory', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var zonasDataFactory = {};    

    var _getZonas = function (prmTorneo) { //trae todas las zonas de un Torneo
        //var prmIdLiga = authSvc.authentication.ligaId;
        var deferred = $q.defer();
        $http.get(urlApi + 'api/ZonaTorneos', {
            params: {                
                prmIdTorneo: prmTorneo
            }
        }).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;

    };

    var _postZona = function (data) { // post de una Zona de un Torneo        
        return $http.post(urlApi + 'api/ZonaTorneos', data).then(function (response) {
            return response.data;
        })
    };

    //var _putTorneo = function (prmId, data) { // PUT de Torneo
    //    var deferred = $q.defer();

    //    $http.put(urlApi + 'api/Torneos/' + prmId, data).then(
    //        function (response) {
    //            deferred.resolve(response);
    //        },

    //        function (response) {
    //            deferred.reject(response.data);
    //        });
    //    return deferred.promise;
    //};
        
    zonasDataFactory.getZonas = _getZonas;
    zonasDataFactory.postZona = _postZona;
    //zonasDataFactory.putTorneo = _putTorneo;

    return zonasDataFactory;


})