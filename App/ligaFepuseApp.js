var ligaFepuseApp = angular.module('ligaFepuseApp', ['ngMaterial', 'ngMdIcons', 'ngResource', 'ui.router', 'ngCookies', 'ngSanitize', 'ngAnimate',
 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'ui.bootstrap'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $stickyStateProvider, cfpLoadingBarProvider) {
        //'ngResource', 'ngMdIcons', 'ui.router', 'ngCookies', 'ngTable',
        //  'ngSanitize', 'ngAnimate', 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'daypilot', 'LocalStorageModule', 'angular-jwt', 'ngMaterial',
        //  'oc.lazyLoad', 'ng-mfb', 'ngAutocomplete', 'angular-input-stars'

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;

        //$urlRouterProvider.when('', '/App/Dashboard/Home');

        $urlRouterProvider.otherwise("/App/Dashboard/Home");

        $stateProvider
        .state('app', {
            abstract: true,
            url: '/App',            
            templateUrl: 'index.html'            
        })

        .state('app.dashboard', {
            url: '/Dashboard',
            templateUrl: 'App/Dashboard/Dashboard.html'
        })
        

            //#region estados de vistas
            .state('app.dashboard.jugadorAdd', {
                url: '/JugadorNuevo',
                templateUrl: 'App/Jugador/Partials/jugadorInfo.html',
                controller: 'jugadorCtrl'
            })
            //#endregion



//#region estados temporales de template

        .state('app.dashboard.home', {
            url: '/Home',
            templateUrl: 'App/Template/home.html'
        })

        .state('app.dashboard.ui', {
            url: '/UI',
            templateUrl: 'App/Template/ui.html'
        })
        .state('app.dashboard.table', {
            url: '/Table',
            templateUrl: 'App/Template/table.html'
        })
        .state('app.dashboard.forms', {
            url: '/Forms',
            templateUrl: 'App/Template/forms.html'
        })
         .state('app.dashboard.login', {
             url: '/Login',
             templateUrl: 'App/Template/login.html'
         })
         .state('app.dashboard.blank', {
             url: '/Blank',
             templateUrl: 'App/Template/blank.html'
         })


        //#endregion

    })