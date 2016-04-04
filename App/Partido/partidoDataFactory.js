ligaFepuseApp.factory('partidoDataFactory', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var partidoDataFactory = {};

    var _getPartido = function (prmIdPartido) { //trae la info del partido incluido equipos y sus jugadores, arbitro, info de la fecha, etc
        console.log("entra info partido");
        //var deferred = $q.defer();
        return $http.get(urlApi + 'api/Partidoes/' + prmIdPartido).then(
            function (response) {
                //deferred.resolve(response);
                return response.data
            },
            function (response) {
                return response.data
            });
        //return deferred.promise;
    };

    var _postPartido = function (data) { //alta de un partido
        var deferred = $q.defer();
        $http.post(urlApi + 'api/Partidoes', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _putPartido = function (prmId, data) { // fpaz: actualizacion de datos del partido
        var deferred = $q.defer();

        $http.put(urlApi + 'api/Partidoes/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },

            function (response) {
                console.log("error en partidoDataFactory");
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    partidoDataFactory.getPartido = _getPartido;
    partidoDataFactory.postPartido = _postPartido;
    partidoDataFactory.putPartido = _putPartido;

    return partidoDataFactory;
});