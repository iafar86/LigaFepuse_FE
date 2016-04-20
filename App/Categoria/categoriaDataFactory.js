ligaFepuseApp.factory('categoriaDataFactory', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    //var urlApi = ""; //azure
    var categoriaDataFactory = {};

    var _getCategorias = function () { //trae todos las categorias
        //var prmIdLiga = authSvc.authentication.ligaId;
        return $http.get(urlApi + '/api/Categorias').then(function (response) {
            console.log(response.data);
            return response.data;
        });

    };

    var _postCategoria = function (data) { // nueva categoria
        return $http.post(urlApi + '/api/Categorias', data).then(function (response) {
            return response;
        })
    };

    var _delCategoria = function (prmId) {
        var deferred = $q.defer();

        $http.delete(url + '/api/Categoria' + prmId).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _putCategoria = function (prmId, data) {
        var deferred = $q.defer();
        $http.put(urlApi + '/api/Categoria/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    categoriaDataFactory.getCategorias = _getCategorias;
    categoriaDataFactory.postCategoria = _postCategoria;
    categoriaDataFactory.delCategoria = _delCategoria;
    categoriaDataFactory.putCategoria = _putCategoria;

    return categoriaDataFactory;
})