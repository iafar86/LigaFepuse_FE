ligaFepuseApp.controller('equipoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    ngTableParams, equipoDataFactory, torneoDataFactory, torneoList)
{
    $scope.torneos = torneoList;// trae todos los torneos de la liga
    $scope.listadoEquipos = [];// guarda los equipos de un torneo

    $scope.equiposLiga = [];// guarda todos los torneos de la liga
    
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
    
    $scope.obtenerEquiposLiga = function () {
        equipoDataFactory.getEquiposLiga().then(
        function (response) {
            $scope.equiposLiga = response;
            //var noExiste = false;
            //for (var i = 0; i < $scope.equiposLiga.length; i++) {
                
            //    for (var j = 0; j < $scope.listadoEquipos.length; j++) {
            //        if ($scope.equiposLiga[i].Nombre == $scope.listadoEquipos[j].Nombre) {
            //            ;
            //            noExiste = true;
            //        }
            //    }
            //    if (noExiste) {
            //        alert("Ya esta en el arreglo")
            //        var index = $scope.equiposLiga.indexOf(i);
            //        $scope.equiposLiga.splice(index, 1);
            //    }

            //}

            
            
            $scope.nuevoEquipo();
        },
        function (err) {
            $scope.error = err;
            alert("Error: " + $scope.error.Message);
        }
        )

    };

    //region dialog
    $scope.nuevoEquipo = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'App/Equipo/Partials/nuevoEquipo.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: useFullScreen,
            equiposLiga: $scope.equiposLiga,
            torneo: $scope.torneoSelect,
            listadoEquipos: $scope.listadoEquipos
            
            //torneoDataFactory: 'torneoDataFactory'
        })
        .then(function (equiposTorneo) {
            $scope.listadoEquipos = equiposTorneo;
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

})
function DialogController($scope, $mdDialog, equiposLiga, torneo, torneoDataFactory, listadoEquipos, equipoDataFactory) {

    $scope.equiposLiga = equiposLiga;
    $scope.equiposAdd = [];
    $scope.equiposTorneo = listadoEquipos;

    $scope.addCheck = function (equipo) {
        if (equipo.isChecked) {
            $scope.equiposTorneo.push(equipo);
        } else {
            var index = $scope.equiposTorneo.indexOf(equipo);
            $scope.equiposTorneo.splice(index, 1);
        }
        
    }

    $scope.addEquipos = function (equiposTorneo)
    {
        
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


            $mdDialog.hide(equiposTorneo);
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