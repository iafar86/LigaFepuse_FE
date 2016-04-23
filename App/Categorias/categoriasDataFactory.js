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

    var _postCategoria = function (data) { // nueva categoria
        return $http.post(urlApi + '/api/Categorias', data).then(function (response) {
            return response;
        })
    };

    var _putCategoria = function (prmId, data) {
        var deferred = $q.defer();
        $http.put(urlApi + '/api/Categorias' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

   

    categoriasDataFactory.getCategorias = _getCategorias;
    categoriasDataFactory.postCategoria = _postCategoria;
    categoriasDataFactory.putCategoria = _putCategoria;

    return categoriasDataFactory;


})