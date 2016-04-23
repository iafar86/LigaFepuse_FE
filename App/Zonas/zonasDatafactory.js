ligaFepuseApp.factory('zonasDataFactory', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var zonasDataFactory = {};    

    var _getZonas = function (prmTorneo) { //fpaz: trae todas las zonas de un Torneo        
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

    var _getZona = function (prmIdZona) { //fpaz: trae la info de una zona en particular
        var deferred = $q.defer();
        $http.get(urlApi + 'api/ZonaTorneos/' + prmIdZona).then(
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

    var _putZona = function (prmId, data) { // PUT de Zona, sirve para actualizar los datos y equipos de una zona
        var deferred = $q.defer();

        $http.put(urlApi + 'api/ZonaTorneos/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
        
    zonasDataFactory.getZonas = _getZonas;
    zonasDataFactory.postZona = _postZona;
    zonasDataFactory.getZona = _getZona;
    zonasDataFactory.putZona = _putZona;

    return zonasDataFactory;


})