ligaFepuseApp.factory('estadisticasDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:50174/"; //desarrollo
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

