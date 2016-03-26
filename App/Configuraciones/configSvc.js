ligaFepuseApp.service('configSvc', function ($http, $q, cuentaDataFactory, tokenDataFactory, localStorageService, jwtHelper) {

    var configSvc = {};

    //#region Configuracion del Url del Api para cambiar entre entornos de produccion y de desarrollo
    var _urlApi = "http://localhost:50174/"; //fpaz: desarrollo
    //var _urlApi = "http://localhost:50174/"; //fpaz: produccion

    //#endregion

    //#region Configuracion del Url del FrontEnd para cambiar entre entornos de produccion y de desarrollo
    var _urlWeb = "http://localhost:50174/"; //fpaz: desarrollo
    //var _urlWeb = "http://localhost:50174/"; //fpaz: produccion

    //#endregion

    configSvc.urlApi = _urlApi;
    configSvc.urlWeb = _urlWeb;

    return configSvc;
});