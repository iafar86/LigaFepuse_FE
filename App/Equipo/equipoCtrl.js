ligaFepuseApp.controller('equipoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    ngTableParams, equipoDataFactory, torneoDataFactory, torneoList, equiposLiga)
{
    $scope.torneos = torneoList;// trae todos los torneos de la liga
    $scope.listadoEquipos = [];// guarda los equipos de un torneo

    $scope.equiposLiga = [];// guarda todos los torneos de la liga
    $scope.equiposLiga = equiposLiga;

    //#Region Obtiene los equipos de un torneo
    $scope.obtenerEquipos = function () {
        torneoDataFactory.getTorneo($scope.torneoSelect.Id).then(function (response) {
            $scope.listadoEquipos = response.Equipos;
        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error: " + $scope.error.Message);
            }
        });
    }
    //#endRegion

    //#Region Dispara el modal para agregar equipos
    $scope.obtenerEquiposLiga = function () {
        equipoDataFactory.getEquiposLiga().then(
        function (response) {
            $scope.equiposLiga = response;           
            $scope.nuevoEquipo();
        },
        function (err) {
            $scope.error = err;
            alert("Error: " + $scope.error.Message);
        }
        )

    };
    //#endRegion

    //region dialog para agregar equipos a un torneo
    $scope.nuevoEquipo = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'App/Equipo/Partials/agregarEquipos.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: useFullScreen,
            equiposLiga: $scope.equiposLiga,
            torneo: $scope.torneoSelect,
            listadoEquipos: $scope.listadoEquipos
        })
        .then(function (equiposTorneo,bandera) {
            torneoDataFactory.getTorneo().then(function (response) {
                $scope.listadoEquipos = response.Equipos;
            })
            if (bandera == null) {
                $scope.torneoSelect = bandera;
                $scope.variable = bandera;
            }
        });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
    //#end Region

    //Region baja de equipo en Torneo
    $scope.delEquipoTorneo = function (equipo) {
        var index = $scope.listadoEquipos.indexOf(equipo);
        $scope.listadoEquipos.splice(index, 1);
        var torneoAdd = {
            Id: $scope.torneoSelect.Id,
            Nombre: $scope.torneoSelect.Nombre,
            AñoInicio: $scope.torneoSelect.AñoInicio,
            AñoFin: $scope.torneoSelect.AñoFin,
            LigaId: $scope.torneoSelect.LigaId,
            Liga: null,
            Fechas: null,
            Arbitros: null,
            EquiposJugadorTorneos: null,
            Equipos: $scope.listadoEquipos
        };
        torneoDataFactory.putTorneo($scope.torneoSelect.Id, torneoAdd).then(function (response) {
            //alert("Equipo correctamente eliminado");
            torneoDataFactory.getTorneo($scope.torneoSelect.Id).then(function (response) {
                $scope.equiposListado = response.Equipos;
            },
            function (err) {
                if (err) {
                    $scope.error = err;
                    alert("Error: " + $scope.error.Message);
                }
            });
        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error al agregar equipos: " + $scope.error.Message);
            }
        });
    }
    //#endRegion

    //#Region dialog para alta de equipo en la liga
    $scope.nuevoEquipoLiga = function (ev) {
        {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'App/Equipo/Partials/nuevoEquipo.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                equiposLiga: $scope.equiposLiga,
                torneo: $scope.torneoSelect,
                listadoEquipos: $scope.listadoEquipos,
            })
            .then(function (equiposLiga) {
                $scope.equiposLiga = equiposLiga;
            });
            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
    }
    //#endRegion
})



//#Region controller Dialog
function DialogController($scope, $mdDialog, equiposLiga, torneo, torneoDataFactory, listadoEquipos, equipoDataFactory) {

    $scope.equiposLiga = equiposLiga;
    $scope.equiposAdd = [];

    $scope.equiposTorneo = [];
    $scope.equiposTorneo = listadoEquipos;

    //Region agrega equipos a una lista temporal para agregar al torneo
    $scope.addCheck = function (equipo) {
        if (equipo.isChecked) {
            $scope.equiposTorneo.push(equipo);
        } else {
            var index = $scope.equiposTorneo.indexOf(equipo);
            $scope.equiposTorneo.splice(index, 1);
        }        
    }
    //#endRegion
    var torneoViejo;
    var bandera;
    $scope.cancelar = function () {
        torneoDataFactory.getTorneo().then(function (response) {
            torneoViejo = response.Equipos;
        },
        function (err) {
            $scope.error = err;
            alert("Error: " + $scope.error.Message);
        });
        $scope.equiposTorneo = torneoViejo;
        bandera = null;
        $scope.hide(torneoViejo,bandera);
        
    }

    //#Region alta de equipos en un torneo
    $scope.addEquipos = function (equiposTorneo)
    {
        var bandera;
        //$scope.equiposAdd.push(equipoListadoPrueba);
        var torneoAdd = {
            Id: torneo.Id,
            Nombre: torneo.Nombre,
            AñoInicio: torneo.AñoInicio,
            AñoFin: torneo.AñoFin,
            LigaId: torneo.LigaId,
            Liga: null,
            Fechas: null,
            Arbitros: null,
            EquiposJugadorTorneos: null,
            Equipos: equiposTorneo
        };
        //Agrego los equipos al torneo
        torneoDataFactory.putTorneo(torneo.Id, torneoAdd).then(function (response) {
            alert("Se agregaron los equipos correctamente");

            bandera = true;
            $mdDialog.hide(equiposTorneo,bandera);
            //$scope.equipoListadoPrueba = [];

            //torneoDataFactory.getTorneo(torneo.Id).then(function (response) {
            //    $scope.listadoEquipos = response.Equipos;
            //    alert("Entra" + listadoEquipos);
            //},
            //function (err) {
            //    if (err) {
            //        $scope.error = err;
            //        alert("Error: " + $scope.error.Message);
            //    }
            //});



        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error al agregar equipos: " + $scope.error.Message);
            }
        })

    }
    //#endRegion

    //alta de equipo sin torneo
    $scope.addEquipo = function (equipo) {
        equipo.LigaId = 2;
        equipo.AlDia = true;
        equipoDataFactory.postEquipo(equipo).then(function (response) {
            alert("Equipo agregado correctamente");
            equipoDataFactory.getEquiposLiga().then(function (response) {
                $scope.equiposLiga = response;
            },
            function (err) {
                if (err) {
                    $scope.error = err;
                    alert("Error" + $scope.error.Message);
                }
            });
        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error: " + $scope.error.Message);
            }
        });
        $scope.equipo = null;
        $scope.variable = false;
    }
    //#endRegion

    //Region Baja de equipo de la liga
    $scope.delEquipoLiga = function (equipo) {
        equipoDataFactory.delEquipo(equipo.Id).then(function () {
            alert("equipo eliminado");
            equipoDataFactory.getEquiposLiga().then(function (response) {
                $scope.equiposLiga = response
            },
            function (err) {
                if (err) {
                    $scope.error = err;
                    alert("Erorr al borrar: " + $scope.error.Message);
                }
            });
        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Erorr al borrar: " + $scope.error.Message);
            }
        });
    }
    //#endRegion


    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $scope = $scope.$new(true);
        $mdDialog.cancel();
    };
}
//#endRegion