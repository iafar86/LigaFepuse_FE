ligaFepuseApp.factory('torneoDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:50174/"; //desarrollo
    var torneoDataFactory = {};

    var _getTorneos = function () { //trae todos los Torneos
        //var prmIdLiga = authSvc.authentication.ligaId;
        return $http.get(urlApi + 'api/Torneos',  {
            params: {
                prmIdLiga: 1, //cambiar por 1
            }
        }).then(function (response) {
            return response.data;
        });

    };

    var _getTorneo = function (prmTorneo) { //trae un Torneo
        //var prmIdLiga = authSvc.authentication.ligaId;
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Torneos', {
            params: {
                prmIdLiga: 1, //cambiar por 1
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

    var _postTorneo = function (data) { // post de un Torneo        
        return $http.post(urlApi + 'api/Torneos', data).then(function (response) {
            return response.data;
        })        
    };

    var _postImagenTorneo = function (data) { //fpaz: alta de una Imagen en el Torneo
        var deferred = $q.defer();
        $http.post(urlApi + 'api/Torneos/Imagen', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _putTorneo = function (prmId, data) { // PUT de Torneo
        var deferred = $q.defer();

        $http.put(urlApi + 'api/Torneos/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    torneoDataFactory.getTorneos = _getTorneos;
    torneoDataFactory.getTorneo = _getTorneo;
    torneoDataFactory.postTorneo = _postTorneo;
    torneoDataFactory.postImagenTorneo = _postImagenTorneo;
    torneoDataFactory.putTorneo = _putTorneo;

    return torneoDataFactory;


})