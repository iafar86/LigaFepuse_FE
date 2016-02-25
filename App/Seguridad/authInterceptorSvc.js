ligaFepuseApp.service('authInterceptorSvc', function ($q, $location, localStorageService) { // servicio para interceptar todas las llamadas al webapi de backend y mostrar los datos solo si el usuario esta logueado
    var authInterceptorServiceFactory = {};

    var _request = function (config) {// cada ves que haga un request primero configuro el header con los datos del token y demas guardados en el localstorage del navegador y luego hago el request necesario

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData'); // obtengo el recurso que tiene guardado el token y demas credenciales, en el localstorage
        if (authData) {
            // si existen credenciales de acceso agrego a la configuracion del header un tipo de autorizacion Bearer que incluye el token obtenido en el login
            config.headers.Authorization = 'Bearer ' + authData.token;
        } // si no encuentra una autorizacion obtenida en el login que guardada en el local storage lo tomo como que es un usuario anonimo, por lo tanto en cada request no necestio mandar el token

        return config;
    }

    var _responseError = function (rejection) { // funcion que se dispara solo si la peticion al web api devolvio un response con error
        if (rejection.status === 401) { // verifico que el error sea 401, que el web api lo devuelve si el usuario no esta autorizado a acceseder a ese recurso
            $location.path('/Inicio/Login'); // en ese caso rmando al usuario a la pagina de login
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
});