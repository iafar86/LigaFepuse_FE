ligaFepuseApp.factory('sedeDataFactory', function ($http,$q) { 
    var urlApi = "http://localhost:50174"; //desarrollo
    //var urlApi = ""; //azure
    var sedeDataFactory = {};

    var _getSedes = function () { //trae todos los Equipos
        //var prmIdLiga = authSvc.authentication.ligaId;
        return $http.get(urlApi + '/api/Sedes').then(function (response) {
            console.log(response.data);
            return response.data;
        });

    };

    var _postSede = function (data) {
        return $http.post(urlApi + 'api/Sedes', data).then(function (response) {
            return response;
        });
    };

    sedeDataFactory.getSedes = _getSedes;
    sedeDataFactory.postSede = _postSede;

    return sedeDataFactory;

});