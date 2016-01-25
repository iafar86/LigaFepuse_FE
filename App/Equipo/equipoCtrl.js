ligaFepuseApp.controller('equipoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    ngTableParams, equipoDataFactory, torneoDataFactory, torneoList)
{
    $scope.torneos = torneoList;// trae todos los torneos de la liga
    $scope.listadoEquipos = [];// guarda los equipos de un torneo

    $scope.equiposLiga = [];// guarda todos los torneos de la liga

    //$scope.equipos = equipoList;
    //$scope.torneoInfo = torneoInfo;
    
    
    
    $scope.obtenerEquipos = function () {
        torneoDataFactory.getTorneo($scope.torneoSelect.Id).then(function (response) {
            $scope.listadoEquipos = response;
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
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
            equiposLiga: $scope.equiposLiga,
            torneo: $scope.torneoSelect,
            listadoEquipos: $scope.listadoEquipos
            
            //torneoDataFactory: 'torneoDataFactory'
        })
        .then(function (listadoEquipos) {
            $scope.listadoEquipos = listadoEquipos;
        });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
   
    //#end Region

    //$scope.torneos = ['primera','segunda'];
})
function DialogController($scope, $mdDialog, equiposLiga, torneo, torneoDataFactory, listadoEquipos, equipoDataFactory) {

    $scope.equipoListadoPrueba = [];// guarda los equipos seleccionados
    $scope.equiposLiga = equiposLiga;
    $scope.equiposAdd = [];
    $scope.equiposAdd = listadoEquipos.Equipos;

    $scope.addCheck = function (equipo) {
        if (equipo.isChecked) {
            $scope.equiposAdd.push(equipo);
        } else {
            var index = $scope.equiposAdd.indexOf(equipo);
            $scope.equiposAdd.splice(index, 1);
        }
        
    }

    $scope.addEquipos = function (equiposAdd)
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
            Equipos: equiposAdd

        }

            torneoDataFactory.putTorneo(torneo.Id, torneoAdd).then(function (response) {
                alert("Se agregaron los equipos correctamente");
                
                $scope.equipoListadoPrueba = [];
                $scope.obtenerEquipos = function () {
                    torneoDataFactory.getTorneo(torneo.Id).then(function (response) {
                        $scope.listadoEquipos = response;
                    },
                    function (err) {
                        if (err) {
                            $scope.error = err;
                            alert("Error: " + $scope.error.Message);
                        }
                    });
                }
                $mdDialog.hide(listadoEquipos);
            },
            function (err) {
                if (err) {
                    $scope.error = err;
                    alert("Error al agregar equipos: " + $scope.error.Message);
                }
            })
        //$scope.hide(equipoListadoPrueba);
    }

    $scope.addEquipo = function (equipo) {
        equipo.AlDia = true;
        equipoDataFactory.postEquipo(equipo);
    }

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    //$scope.agregar = function (equipo) {
    //    $mdDialog.hide(equipo);
    //};
}
