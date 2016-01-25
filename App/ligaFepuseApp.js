var ligaFepuseApp = angular.module('ligaFepuseApp', ['ngMaterial', 'ng-mfb','ngMdIcons', 'ngResource', 'ui.router', 'ngCookies', 'ngTable', 'ngSanitize', 'ngAnimate',
 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'daypilot', 'LocalStorageModule', 'angular-jwt', 'ui.bootstrap'])
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

        .state('app.dashboard.torneo', {
            url: '/Torneos',
            templateUrl: 'App/Torneo/Partials/torneoAdd.html',
            controller: 'torneoCtrl',
            resolve: {
                torneoDataFactory: 'torneoDataFactory',
                torneoList: function (torneoDataFactory) {
                    return torneoDataFactory.getTorneos();
                }
            }
        })

         .state('app.dashboard.login', {
             url: '/Login',
             templateUrl: 'App/Template/login.html'
         })

         .state('app.dashboard.equipos', {
             url: '/Equipos',
             templateUrl: 'App/Equipo/Partials/equipoAdd.html',
             controller: 'equipoCtrl',
             resolve: {
                 equipoDataFactory: 'equipoDataFactory',

                 torneoDataFactory: 'torneoDataFactory',

                 torneoList: function (torneoDataFactory) {
                     return torneoDataFactory.getTorneos();
                 },

                 //torneoInfo: function (torneoDataFactory) {
                 //    return torneoDataFactory.getTorneo(infoTorneo.Id);
                 //}                
             }
         })



    })
