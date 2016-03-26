ligaFepuseApp.factory('arbitroDataFactory', function ($http, $q, authSvc, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var arbitroDataFactory = {};


    var _getArbitros = function () { //Trae todos los arbitros de la Liga
        return $http.get(urlApi + 'api/Arbitroes', {
            params: {
                //prmIdLiga: authSvc.authentication.LigaId, //iafar: para acceder a los datos del token
                prmIdLiga: 1,
            }
        }).then(
            function (response) {
                return response.data
            },
            function (response) {
                return response.data;
            });
    };

    var _postArbitro = function (data) { // nuevo  arbitro
        return $http.post(urlApi + 'api/Arbitroes', data).then(function (response) {
            return response.data;
        })
    };

    var _putArbitro = function (prmId, data) { // modifica un arbitro
        var deferred = $q.defer();

        $http.put(urlApi + '/api/Arbitroes/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _delArbitro = function (prmId) {
        var deferred = $q.defer();

        $http.delete(url + 'api/Arbitroes' + prmId).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _postImagenArbitro = function (data) { //fpaz: alta de una Imagen del Arbitro
        var deferred = $q.defer();
        $http.post(urlApi + 'api/Arbitroes/Imagen', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };



    arbitroDataFactory.getArbitros = _getArbitros;
    arbitroDataFactory.postArbitro = _postArbitro;
    arbitroDataFactory.putArbitro = _putArbitro;
    arbitroDataFactory.delArbitro = _delArbitro;
    arbitroDataFactory.postImagenArbitro = _postImagenArbitro;

    return arbitroDataFactory;
});