ligaFepuseApp.factory('partidoDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:50174/"; //desarrollo
    var partidoDataFactory = {};

    //var _getFecha = function (prmIdFecha) { //trae la info de la fecha y los partidos de la fecha para mostrarlos en el fixture            
    //    return $http.get(urlApi + 'api/Fechas/' + prmIdFecha).then(
    //        function (response) {
    //            return response.data
    //        },
    //        function (response) {
    //            return response.data;
    //        });
    //};

    partidoDataFactory.getFecha = _getFecha;

    return partidoDataFactory;
});