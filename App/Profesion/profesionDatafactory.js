ligaFepuseApp.factory('profesionDataFactory', function ($http,$q) { 
    var urlApi = "http://localhost:50174"; //desarrollo
    //var urlApi = ""; //azure
    var profesionDataFactory = {};

    var _getProfesiones = function () { //trae todas las profesiones
        return $http.get(urlApi + '/api/Profesions').then(function (response) {
           
            return response.data;
        });

    };

    var _postProfesion = function (data) {
        return $http.post(urlApi + '/api/Profesions', data).then(function (response) {
            return response;
        });
    };

    profesionDataFactory.getProfesiones = _getProfesiones;
    profesionDataFactory.postProfesion = _postProfesion;

    return profesionDataFactory;

});