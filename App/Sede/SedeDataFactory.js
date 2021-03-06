﻿ligaFepuseApp.factory('sedeDataFactory', function ($http,$q, configSvc) { 
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    //var urlApi = ""; //azure
    var sedeDataFactory = {};

    var _getSedes = function () { //trae todos los Equipos
        //var prmIdLiga = authSvc.authentication.ligaId;
        return $http.get(urlApi + '/api/Sedes').then(function (response) {
            console.log(response.data);
            return response.data;
        });

    };

    var _postSede = function (data) { // nueva sede
        return $http.post(urlApi + '/api/Sedes', data).then(function (response) {
            return response;
        })
    };

    var _delSede = function (prmId) {
        var deferred = $q.defer();

        $http.delete(url + '/api/Sedes' + prmId).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _putSede = function (prmId, data) {
        var deferred = $q.defer();
        $http.put(urlApi + '/api/Sedes/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    sedeDataFactory.getSedes = _getSedes;
    sedeDataFactory.postSede = _postSede;
    sedeDataFactory.delSede = _delSede;
    sedeDataFactory.putSede = _putSede;

    return sedeDataFactory;

});