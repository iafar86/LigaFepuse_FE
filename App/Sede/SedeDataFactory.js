ligaFepuseApp.factory('sedeDataFactory', function ($resource) { 
    var urlApi = "http://localhost:50174/"; //desarrollo
    //var urlApi = ""; //azure
    return $resource(urlApi + 'api/Sedes',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});