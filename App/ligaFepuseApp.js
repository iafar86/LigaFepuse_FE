var ligaFepuseApp = angular.module('ligaFepuseApp', ['ngMaterial', 'ng-mfb', 'ngMdIcons', 'ngResource', 'ui.router', 'ngCookies', 'ngTable', 'ngSanitize', 'ngAnimate',
 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'daypilot', 'LocalStorageModule', 'angular-jwt', 'ui.bootstrap', 'twitter.timeline',
'ezfb', 'md.data.table'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $stickyStateProvider, cfpLoadingBarProvider, ezfbProvider) {



        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;


        $urlRouterProvider.otherwise("/Inicio/Login");

        $stateProvider

        //#region Seguridad
        .state('seguridad', {
            abstract: true,
            url: '/Inicio',
            views: {
                '': {
                    templateUrl: ''
                },
                'content': {
                    templateUrl: ''
                }
            }
        })
        .state('seguridad.login', {
            url: '/Login',
            templateUrl: '/App/Seguridad/Partials/login.html',
            controller: 'loginCtrl'
        })

        .state('seguridad.signup', {
            url: '/Signup',
            templateUrl: '/App/Seguridad/Partials/signup.html',
            controller: 'signupCtrl'
        })

        .state('seguridad.confirm', {
            url: '/Confirm',
            templateUrl: '/App/Seguridad/Partials/confirmCuenta.html',
            controller: 'loginCtrl'
        })
        //#endregion

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
            templateUrl: 'App/Home/Partials/home.html',
            controller: 'homeCtrl',
            resolve: {
                //equipoTorneoDataFactory: 'equipoTorneoDataFactory',
                //torneoDataFactory: 'torneoDataFactory',
                torneosList: function (torneoDataFactory) {
                    return torneoDataFactory.getTorneos();
                }

            }
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
                            },
                            listEquipos: function () {
                                return { value: [] };
                            },
                            listArbitros: function () {
                                return { value: [] };
                            },
                            infoTorneo: function () {
                                return { value: [] };
                            }
                        }
                    }
                }
            })
            .state('torneo.info.tablaPos', {
                url: '/Tabla',
                views: {
                    'tabla': {
                        templateUrl: 'App/Torneo/Partials/torneoTablaPosiciones.html',
                        controller: 'equipoTorneoCtrl',
                        resolve: {
                            equipoTorneoDataFactory: 'equipoTorneoDataFactory',
                            //kike
                            torneoDataFactory: 'torneoDataFactory',
                            equipoDataFactory: 'equipoDataFactory',
                            listadoEquiposTorneo: function(torneoDataFactory, $stateParams){
                                var torneoId= $stateParams.torneoId;
                                return torneoDataFactory.getTorneo(torneoId);
                            },
                            //equiposLiga: function(equipoDataFactory){
                            //    return equipoDataFactory.getEquiposLiga;
                            //},
                            //kike
                            tablaPosiciones: function (equipoTorneoDataFactory, $stateParams) {
                                var torneoId = $stateParams.torneoId;
                                return equipoTorneoDataFactory.getTablaPosiciones(torneoId);
                            }
                        }
                    }
                }

            })
            //#endregion

        //#region Fechas

             .state('fecha', {
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

             .state('fecha.fechasAdd', {
                 url: '/FechasAdd',
                 templateUrl: 'App/Fecha/Partials/fechaAdd.html'
                 //controller: 'fechaCtrl'
                 //resolve: {

                 //    }
             })
         //#endregion


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
                 equiposLiga: function (equipoDataFactory) {
                     return equipoDataFactory.getEquiposLiga();

                 },

                 arbitroList: function (arbitroDataFactory) {
                     return arbitroDataFactory.getArbitros();
                 }
                 //equiposLiga: function (equiposDataFactory) {
                 //    return equiposDataFactory.getEquiposLiga();
                 //}

                 //torneoInfo: function (torneoDataFactory) {
                 //    return torneoDataFactory.getTorneo(infoTorneo.Id);
                 //}                
             }
         })
            .state('equipo.laLiga', {
                url: '/LaLiga',
                templateUrl: 'App/Equipo/Partials/equiposLiga.html',
                controller: 'equipoCtrl',
                //controller: 'arbitroCtrl',
                resolve: {


                    torneoDataFactory: 'torneoDataFactory',

                    equipoDataFactory: 'equipoDataFactory',
                    arbitroDataFactory: 'arbitroDataFactory',
                    torneoList: function (torneoDataFactory) {
                        return torneoDataFactory.getTorneos();
                    },
                    equiposLiga: function (equipoDataFactory) {
                        equipoDataFactory.getEquiposLiga().then(function (response) {
                            equiposLiga = response;
                        },
                        function (err) {
                            if (err) {
                                $scope.error = err;
                                alert("Error: " + $scope.error.Message);
                            }
                        });
                        return equiposLiga

                    },

                    arbitroList: function (arbitroDataFactory) {
                        return arbitroDataFactory.getArbitros();
                    },

                    //arbitroCtrl:'arbitroCtrl'
                    //torneoInfo: function (torneoDataFactory) {
                    //    return torneoDataFactory.getTorneo(infoTorneo.Id);
                    //}                
                }
            })


            .state('equipo.listadoLiga', {
                url: '/EquiposLiga',
                templateUrl: 'App/Equipo/Partials/prueba.html',
                controller: 'equipoCtrl',
                resolve: {
                    equipoDataFactory: 'equipoDataFactory',
                    torneoDataFactory: 'torneoDataFactory',

                    torneoList: function () {
                        return { value: [] }
                    },
                    equiposLiga: function () {
                        return equipoDataFactory.getEquiposLiga();
                    }
                }
            })
        //#endregion

        //#region Partidos
        .state('partido', {
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
        .state('partido.info', {
            url: '/Partido/:partidoId',
            templateUrl: 'App/Partido/Partials/partidoInfo.html',
            controller: 'partidoCtrl',
            resolve: {
                partidoDataFactory: 'partidoDataFactory',
                //infoPartido: function () {
                //    return { value: [] };
                //},
                infoPartido: function (partidoDataFactory, $stateParams) {
                    var partidoId = $stateParams.partidoId;
                    return partidoDataFactory.getPartido(partidoId);
                },
                listPartidos: function () {
                    return { value: [] };
                },
                listEquipos: function () {
                    return { value: [] };
                },
                infoTorneo: function () {
                    return { value: [] };
                },
                listArbitros: function (arbitroDataFactory) {
                    return arbitroDataFactory.getArbitros();
                }
            }
        })
        //#endregion

        //#region Jugadores
           .state('jugador', {
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


            .state('jugador.jugadorInfo', {
                url: '/JugadorInfo/',
                templateUrl: 'App/Jugador/Partials/jugadorInfo.html',
                controller: 'jugadorCtrl'
            })

            .state('jugador.jugadorList', {
                url: '/ListaJugadores/:idTorneo?idEquipo', //:idTorneo?idEquipo
                templateUrl: 'App/Jugador/Partials/jugadorEquipo.html',
                controller: 'jugadorCtrl',
                resolve: {
                    torneoDataFactory: 'torneoDataFactory',
                    equipoDataFactory: 'equipoDataFactory',
                    jugadorDataFactory: 'jugadorDataFactory',
                    torneoInfo: function (torneoDataFactory, $stateParams) {
                        var torneoId = $stateParams.idTorneo;
                        return torneoDataFactory.getTorneo(torneoId)
                    },
                    equipoInfo: function (equipoDataFactory, $stateParams) {
                        var equipoId = $stateParams.idEquipo;
                        return equipoDataFactory.getEquipo(equipoId)
                    },
                    jugadoresList: function (jugadorDataFactory, $stateParams) {
                        var torneoId = $stateParams.idTorneo;
                        var equipoId = $stateParams.idEquipo;
                        return jugadorDataFactory.getJugadoresEquipoTorneo(torneoId, equipoId)
                    }

                },
                params: {
                    idTorneo: "miTorneo",
                    idEquipo: "miEquipo"
                }
            })

        //#endregion

        //#region Arbitros
        .state('arbitro', {
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

         .state('arbitro.arbitroInfo', {
             url: '/arbitroInfo',
             templateUrl: 'App/Arbitro/Partials/arbitroInfo.html',
             controller: 'arbitroCtrl'
         })


        .state('arbitro.arbitroList', {
            url: '/arbitroList/:idLiga',
            templateUrl: 'App/Arbitro/Partials/arbitroList.html',
            controller: 'arbitroCtrl',
            resolve: {
                arbitroDataFactory: 'arbitroDataFactory',
                arbitroList: function (arbitroDataFactory) {
                    return arbitroDataFactory.getArbitros();
                }

            },
            params: {
                idLiga: "miLiga"
            }
        })


        //#endregion



        ezfbProvider.setInitParams({
            // This is my FB app id for plunker demo app
            appId: '983474251732776',
            version: 'v2.5'
        })


    })


