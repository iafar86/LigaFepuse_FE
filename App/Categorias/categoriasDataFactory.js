ligaFepuseApp.factory('categoriasDataFactory', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var categoriasDataFactory = {};

    var _getCategorias = function (prmIdLiga) { //fpaz: trae todas las Categorias de una Liga
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Categorias', {
            params: {
                prmIdLiga: 1 //prmLigaId
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

   

    categoriasDataFactory.getCategorias = _getCategorias;

    return categoriasDataFactory;


})