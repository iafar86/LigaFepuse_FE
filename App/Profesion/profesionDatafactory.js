ligaFepuseApp.factory('profesionDataFactory', function ($resource) { 
    var urlApi = "http://localhost:50174/"; //desarrollo
    //var urlApi = ""; //azure
    return $resource(urlApi + 'api/Profesions',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});