ligaFepuseApp.factory('tokenDataFactory', function ($resource) { // data factory para generar y manejar los tokens de acceso
    //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = "http://localhost:50174/"; //desarrollo
    //var urlApi = ""; //azure
    return $resource(urlApi + '/oauth/token',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});