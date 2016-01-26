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
           
            
            //for (equipoLiga in $scope.equiposLiga)
            //{
            //    for (equipo in $scope.listadoEquipos) {

            //        var index = $scope.equiposLiga.indexOf(equipo);
            //        $scope.equiposLiga.splice(equipoLiga, 1);
            //        //if(equipoLiga.Nombre == equipo.Nombre)
            //        //{
                        
            //        //    alert("entra al if" + equipoLiga);
            //        //}
            //        //alert("entra");
            //        //index = 0;
            //        //index = $scope.equiposLiga.indexOf($scope.listadoEquipos[equipo]);
            //        //alert("obtiene el index" + index)
            //        //if (index >= 0) {
            //        //    alert("entra 2");
            //        //    $scope.equiposLiga.splice(index, 1);
            //        //}
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

    //$scope.torneos = ['primera','segunda'];
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

    $scope.addEquipo = function (equipo) {
        equipo.AlDia = true;
        equipoDataFactory.postEquipo(equipo);
    }

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $scope = $scope.$new(true);
        $mdDialog.cancel();
    };

    //$scope.agregar = function (equipo) {

    //    $mdDialog.hide(equipo);
    //};
}