ligaFepuseApp.factory('arbitroDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:50174/"; //desarrollo
    var arbitroDataFactory = {};

    var _getArbitros = function () { //trae la info de la fecha y los partidos de la fecha para mostrarlos en el fixture            
        return $http.get(urlApi + 'api/Arbitroes', {
            params: {
                prmIdLiga: 2, //cambiar por 1
            }
        }).then(
            function (response) {
                return response.data
            },
            function (response) {
                return response.data;
            });
    };

    arbitroDataFactory.getArbitros = _getArbitros;

    return arbitroDataFactory;
});