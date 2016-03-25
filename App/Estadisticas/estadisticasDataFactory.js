ligaFepuseApp.factory('estadisticasDataFactory', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var estadisticasDataFactory = {};

    var _getEstadisticasTorneo = function (prmIdTorneo) { //fpaz: trae las estadisticas del torneo seleccionado
        return $http.get(urlApi + 'api/Estadisticas/' + prmIdTorneo).then(
            function (response) {
                return response.data
            },
            function (response) {
                return response.data;
            });
    };

    estadisticasDataFactory.getEstadisticasTorneo = _getEstadisticasTorneo;   

    return estadisticasDataFactory;
});

