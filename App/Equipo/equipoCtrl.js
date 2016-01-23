ligaFepuseApp.controller('equipoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    ngTableParams, equipoDataFactory, torneoDataFactory, torneoList)
{
    $scope.torneos = torneoList;
    $scope.listadoEquipos = [];
    //$scope.equipos = equipoList;
    //$scope.torneoInfo = torneoInfo;
    
    
    $scope.obtenerEquipos = function () {
        alert("adentro");
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

    $scope.equipoListado = [];

    $scope.addEquipo = function () {
        equipoTemp = {
            IdTemp: $scope.equipo.Id,
            equipoNombreTemp: $scope.equipo.Nombre,
            //alDia: $scope.equipo.alDia
        }
        $scope.equipoListado.push(equipoTemp);
        $scope.equipo.Nombre = '';
        $scope.hide();
        alert("Llega")
    }

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
            equiposLiga: 
                equipoDataFactory.getEquiposLiga().then(
                    function (response) {
                        console.log(response);
                        //console.log(response.data);
                        return response;
                    },
                    function (err) {
                        if (err) {
                            $scope.error = err;
                            alert("Error: " + $scope.error.Message);
                        }
                    }),
            resolve: {
                //equipoDataFactory: 'equipoDataFactory',
                //equiposLiga: function (equipoDataFactory) {
                //    equipoDataFactory.getEquiposLiga().then(
                //        function (response) {
                //            console.log(response);
                //            //console.log(response.data);
                //            return response;
                //        },
                //        function (err) {
                //            if (err) {
                //                $scope.error = err;
                //                alert("Error: " + $scope.error.Message);
                //            }
                //        });
                //}
                
                
            }
        })
        .then(function (equipo) {
            $scope.equipoListado.push(equipo);
            //$scope.hide();
            //alert("Llega")
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
function DialogController($scope, $mdDialog, equiposLiga) {

    $scope.equipoListadoPrueba = [];
    //$scope.equiposLiga = [];
    $scope.equiposLiga = equiposLiga;

    $scope.addEquipo = function (equipo)
    {
        $scope.equipoListadoPrueba.push(equipo);
        $scope.hide(equipo);
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
