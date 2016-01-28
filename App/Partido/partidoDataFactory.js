ligaFepuseApp.factory('partidoDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:50174/"; //desarrollo
    var partidoDataFactory = {};

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

    partidoDataFactory.postPartido = _postPartido;

    return partidoDataFactory;
});