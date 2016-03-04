ligaFepuseApp.factory('profesionDataFactory', function ($http, $q) { 
    var urlApi = "http://localhost:50174"; //desarrollo
    //var urlApi = ""; //azure
    var profesionDataFactory = {};

    var _getProfesiones = function () { //trae todas las profesiones
        //var prmIdLiga = authSvc.authentication.ligaId;
        return $http.get(urlApi + '/api/Profesions').then(function (response) {
            console.log(response.data);
            return response.data;
        });

    };

    var _postProfesion = function (data) { // nueva profesion
        return $http.post(urlApi + '/api/Profesions', data).then(function (response) {
            return response;
        })
    };

    var _delProfesion = function (prmId) {
        var deferred = $q.defer();

        $http.delete(url + '/api/Profesion' + prmId).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    profesionDataFactory.getProfesiones = _getProfesiones;
    profesionDataFactory.postProfesion = _postProfesion;
    profesionDataFactory.delProfesion = _delProfesion;

    return profesionDataFactory;
});