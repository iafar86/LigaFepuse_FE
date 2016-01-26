
var ligaFepuseApp = angular.module('ligaFepuseApp', ['ngMaterial', 'ng-mfb','ngMdIcons', 'ngResource', 'ui.router', 'ngCookies', 'ngTable', 'ngSanitize', 'ngAnimate',
 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'daypilot', 'LocalStorageModule', 'angular-jwt', 'ui.bootstrap'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $stickyStateProvider, cfpLoadingBarProvider) {
        //'ngResource', 'ngMdIcons', 'ui.router', 'ngCookies', 'ngTable',
        //  'ngSanitize', 'ngAnimate', 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'daypilot', 'LocalStorageModule', 'angular-jwt', 'ngMaterial',
        //  'oc.lazyLoad', 'ng-mfb', 'ngAutocomplete', 'angular-input-stars'

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
        

        $urlRouterProvider.otherwise("/App/Home");

        $stateProvider

        //#region App
        .state('app', {            
            abstract: true,	
            url: '/App',
            views: {
                '': {
                    templateUrl: 'App/Template/layout.html'
                },
                'content': {
                    templateUrl: 'App/Dashboard/Dashboard.html'
                }
            }
        })

        .state('app.home', {
            url: '/Home',
            templateUrl: 'App/Template/home.html'
        })

        .state('app.ui', {
            url: '/UI',
            templateUrl: 'App/Template/ui.html'
        })

        .state('app.table', {
            url: '/Table',
            templateUrl: 'App/Template/table.html'
        })

         //#endregion

        //#region Torneos
            .state('torneo', {
                abstract: true,
                url: '',
                views: {
                    '': {
                        templateUrl: 'App/Template/layout.html'
                    },
                    'content': {
                        templateUrl: 'App/Dashboard/Dashboard.html'
                    }
                }
            })
        .state('torneo.list', {
            url: '/Torneos',
            templateUrl: 'App/Torneo/Partials/torneoAdd.html',
            controller: 'torneoCtrl',
            resolve: {
                torneoDataFactory: 'torneoDataFactory',
                torneoList: function (torneoDataFactory) {
                    return torneoDataFactory.getTorneos();
                },
                infoTorneo: function (torneoDataFactory) {
                    return { value: [] };
                }
            }
        })
             .state('torneo.info', {
                 url: '/Torneo/:torneoId',
                 templateUrl: 'App/Torneo/Partials/torneoInfo.html',                 
                 controller: 'torneoCtrl',
                 resolve: {
                     torneoDataFactory: 'torneoDataFactory',
                     torneoList: function () {
                         return { value: [] };
                     },
                     infoTorneo: function (torneoDataFactory, $stateParams) {
                         var torneoId = $stateParams.torneoId;
                         return torneoDataFactory.getTorneo(torneoId);
                     }
                 }
             })
            .state('torneo.info.fecha', {
                url: '/Fecha/:fechaId',
                views: {
                    'partidos': {
                        templateUrl: 'App/Partido/Partials/partidosList.html',
                        controller: 'fechaCtrl',
                        resolve: {
                            fechaDataFactory: 'fechaDataFactory',
                            listPartidos: function (fechaDataFactory, $stateParams) {
                                var fechaId = $stateParams.fechaId;
                                return fechaDataFactory.getFecha(fechaId);
                                //return fechaDataFactory.get({ id: fechaId });
                            }                                                        
                        }
                    }
                }
            })

            //#endregion

         .state('app.dashboard.login', {
             url: '/Login',
             templateUrl: 'App/Template/login.html'
         })

        //#region Equipos
            .state('equipo', {
                abstract: true,
                url: '',
                views: {
                    '': {
                        templateUrl: 'App/Template/layout.html'
                    },
                    'content': {
                        templateUrl: 'App/Dashboard/Dashboard.html'
                    }
                }
            })
         .state('equipo.equipos', {
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
        //#endregion



    })
