ligaFepuseApp.factory('equipoDataFactory', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var equipoDataFactory = {};
       
    var _getEquiposLiga = function () { //trae todos los Equipos
        //var prmIdLiga = authSvc.authentication.ligaId;
        return $http.get(urlApi + 'api/Equipoes', {
            params: {
                prmIdLiga: 1,// cambiar para liga 1
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        });

    };

    var _getEquipos = function (prmIdTorneo) { //trae todos los equipos de un torneo
        console.log("entra por getEquipos del Torneo");
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Equipoes', {
            params: {
                prmIdTorneo: prmIdTorneo
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

    var _getEquipo = function (prmEquipo) { //trae un Equipo
        var deferred = $q.defer();
        $http.get(urlApi + '/api/Equipoes/' + prmEquipo).then(
            function (response) {
                console.log(response.data)
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;

    };



    var _postEquipo = function (data) { // post de un equipo
        return $http.post(urlApi + '/api/Equipoes', data).then(function (response) {
            return response.data;
        })
    };

    var _putEquipo = function (prmId, data) { // modifica un torneo
        var deferred = $q.defer();

        $http.put(urlApi + '/api/Equipoes' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _delEquipo = function (prmId) {
        var deferred = $q.defer();

        $http.delete(url + 'api/Equipoes' + prmId).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _postImagenEquipo = function (data) { //fpaz: alta de una Imagen en el Torneo
        console.log("entra a postImagenEquipo")
        var deferred = $q.defer();
        $http.post(urlApi + '/api/Equipoes/Imagen', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    equipoDataFactory.getEquipos = _getEquipos;
    equipoDataFactory.getEquipo = _getEquipo;
    equipoDataFactory.getEquiposLiga = _getEquiposLiga;
    equipoDataFactory.postEquipo = _postEquipo;
    equipoDataFactory.putEquipo = _putEquipo;
    equipoDataFactory.delEquipo = _delEquipo;
    equipoDataFactory.postImagenEquipo = _postImagenEquipo;

    return equipoDataFactory;


})