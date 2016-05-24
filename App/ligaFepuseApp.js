var ligaFepuseApp = angular.module('ligaFepuseApp', ['ngMaterial', 'ng-mfb', 'ngMdIcons', 'ngResource', 'ui.router', 'ngCookies', 'ngTable', 'ngSanitize', 'ngAnimate',
 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'daypilot', 'LocalStorageModule', 'angular-jwt', 'ui.bootstrap', 'twitter.timeline',
'ezfb', 'md.data.table', 'uiRouterStyles', 'ngFileUpload', 'vAccordion'])
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
            controller: 'loginCtrl',
            data: {
                css: '/App/Seguridad/styleLoginCss.css'
            }
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
                },
                equiposTorneo: function () {
                    return { value: [] };
                },
                categoriasDataFactory: 'categoriasDataFactory',                
                categoriasList: function (categoriasDataFactory) {                    
                    return categoriasDataFactory.getCategorias();
                }
            }
        })
             .state('torneo.info', {                 
                 url: '/Torneo/:torneoId',
                 templateUrl: 'App/Torneo/Partials/torneoInfo.html',
                 controller: 'torneoCtrl',
                 resolve: {
                     torneoDataFactory: 'torneoDataFactory',
                     equipoDataFatory: 'equipoDataFactory',
                     torneoList: function () {
                         return { value: [] };
                     },
                     infoTorneo: function (torneoDataFactory, $stateParams) {
                         var torneoId = $stateParams.torneoId;
                         return torneoDataFactory.getTorneo(torneoId);
                     },

                     listadoSedes: function (sedeDataFactory) {
                         return sedeDataFactory.getSedes();
                     },
                     equiposLiga: function (equipoDataFactory) {                         
                         return equipoDataFactory.getEquiposLiga();
                     },
                     equiposTorneo: function (equipoDataFactory, $stateParams) {
                         var torneoId = $stateParams.torneoId;                         
                         return equipoDataFactory.getEquipos(torneoId);
                     },
                     categoriasList: function () {
                         return { value: [] };
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
                            sedeDataFactory: 'sedeDataFactory',
                            listPartidos: function (fechaDataFactory, $stateParams) {
                                var fechaId = $stateParams.fechaId;
                                return fechaDataFactory.getFecha(fechaId);                                
                            },
                            listEquipos: function () {
                                return { value: [] };
                            },
                            listArbitros: function () {
                                return { value: [] };
                            },
                            infoTorneo: function () {
                                return { value: [] };
                            },
                            listSedes: function (sedeDataFactory) {
                                return sedeDataFactory.getSedes();
                            },
                            categoriasList: function (categoriaDataFactory) {
                                return categoriaDataFactory.getCategorias();
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
                            equiposLiga: function (equipoDataFactory) {
                                return equipoDataFactory.getEquiposLiga();
                            },                                                        
                            tablaPosiciones: function (equipoTorneoDataFactory, $stateParams) {
                                var torneoId = $stateParams.torneoId;
                                return equipoTorneoDataFactory.getTablaPosiciones(torneoId);
                            }                                                        
                        }
                    }
                }

            })
            .state('torneo.info.estadisticas', {
                url: '/Estadisticas',
                views: {
                    'estadisticas': {
                        templateUrl: 'App/Torneo/Partials/torneoEstadisticas.html',
                        controller: 'estadisticasCtrl',
                        resolve: {
                            estadisticasDataFactory: 'estadisticasDataFactory',                            
                            estadisticasTorneo: function (estadisticasDataFactory, $stateParams) {
                                var torneoId= $stateParams.torneoId;
                                return estadisticasDataFactory.getEstadisticasTorneo(torneoId);
                            }
                        }
                    }
                }

            })
            .state('torneo.info.zonas', {
                url: '/zonas',
                views: {
                    'zonas': {
                        templateUrl: 'App/Torneo/Partials/torneoZonas.html',
                        controller: 'zonasCtrl',
                        resolve: {
                            zonasDataFactory: 'zonasDataFactory',
                            zona: function () {
                                return { value: [] };
                            },
                            zonasTorneo: function (zonasDataFactory, $stateParams) {
                                var torneoId = $stateParams.torneoId;
                                return zonasDataFactory.getZonas(torneoId);
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
                 templateUrl: 'App/Fecha/Partials/fechaAdd.html',
                 controller: 'fechaCtrl',
                 resolve: {
                     sedeDataFactory: 'sedeDataFactory',
                     listadoSedes: function (sedeDataFactory) {
                         return sedeDataFactory.getSedes();
                     }
                     }
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
                 arbitroDataFactory: 'arbitroDataFactory',                 
                 torneoList: function () {
                     return { value: [] }
                 },
                 equiposLiga: function (equipoDataFactory) {
                     return equipoDataFactory.getEquiposLiga();
                 },
                 arbitroList: function () {
                     return { value: [] }
                 },

                 sedesList: function () {
                     return {value: []}
                 },

                 profesionesList: function () {
                     return {value: []}
                 },
                 categoriasList: function () {
                     return { value: [] }
                 }
             }
         })
         .state('equipo.laLiga', {
                url: '/Liga',
                templateUrl: 'App/Equipo/Partials/equiposLiga.html',
                controller: 'equipoCtrl',
                resolve: {  
                    arbitroDataFactory: 'arbitroDataFactory',
                    sedeDataFactory: 'sedeDataFactory',
                    profesionDataFactory: 'profesionDataFactory',
                    categoriasDataFactory: 'categoriasDataFactory',
                    torneoList: function () {
                        return { value: [] }
                    },
                    equiposLiga: function () {
                        return { value: [] }
                    },
                    arbitroList: function (arbitroDataFactory) {
                        return arbitroDataFactory.getArbitros();
                    },

                    sedesList: function (sedeDataFactory) {
                        return sedeDataFactory.getSedes();
                    },

                    profesionesList: function (profesionDataFactory) {
                        return profesionDataFactory.getProfesiones();
                    },
                    
                    categoriasList: function (categoriasDataFactory) {
                        return categoriasDataFactory.getCategorias();
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
                sedeDataFactory: 'sedeDataFactory',
                arbitroDataFactory: 'arbitroDataFactory',
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
                },
                listSedes: function (sedeDataFactory) {
                    return sedeDataFactory.getSedes();
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
                url: '/ListaJugadores/:idEquipo?idCategoria', 
                templateUrl: 'App/Jugador/Partials/jugadorEquipo.html',
                controller: 'jugadorCtrl',
                resolve: {
                    torneoDataFactory: 'torneoDataFactory',
                    equipoDataFactory: 'equipoDataFactory',
                    jugadorDataFactory: 'jugadorDataFactory',
                    profesionDataFactory:'profesionDataFactory',
                    equipoInfo: function (equipoDataFactory, $stateParams) {
                        var equipoId = $stateParams.idEquipo;
                        return equipoDataFactory.getEquipo(equipoId)
                    },
                    profesionesList: function (profesionDataFactory) {
                        return profesionDataFactory.getProfesiones();
                    },
                    jugadoresPorCategoriaList: function () {
                        return { value: [] }
                    },

                }
            })

            .state('equipo.jugadoresLiga', {
                url: '/Jugadores',
                templateUrl: 'App/Jugador/Partials/jugadoresLiga.html',
                controller: 'jugadorCtrl',
                resolve: {
                    torneoDataFactory: 'torneoDataFactory',
                    equipoDataFactory: 'equipoDataFactory',
                    jugadorDataFactory: 'jugadorDataFactory',
                    profesionDataFactory: 'profesionDataFactory',
                    profesionesList: function (profesionDataFactory) {
                        return profesionDataFactory.getProfesiones();
                    },
                    
                    equiposLiga: function (equipoDataFactory) {
                        return { value: [] };
                    },

                    jugadoresPorCategoriaList: function (jugadorDataFactory) {
                        prmLigaId = 1;
                        return jugadorDataFactory.getJugadoresPorCategoria();
                    },
                    
                    torneoInfo: function () {                       
                        return { value: [] }
                    },
                    equipoInfo: function () {                        
                        return { value: [] }
                    },
                    jugadoresList: function () {                        
                        return { value: [] }
                    },
                    
                    categoriasList: function () {
                        return { value: [] };
                    }

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

        //#region Zona Torneo
        .state('zona', {
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
            .state('zona.info', {
                url: '/zona/:zonaId',
                templateUrl: 'App/Zonas/Partials/zonaInfo.html',
                controller: 'zonasCtrl',
                resolve: {
                    zonasDataFactory: 'zonasDataFactory',
                    zona: function (zonasDataFactory, $stateParams) {
                        var zonaId = $stateParams.zonaId;
                        return zonasDataFactory.getZona(zonaId);
                    },
                    zonasTorneo: function () {
                        return { value: [] };
                    }
                }
            })
        //#endregion

        ezfbProvider.setInitParams({
            // This is my FB app id for plunker demo app
            appId: '983474251732776',
            version: 'v2.5'
        })


    })


