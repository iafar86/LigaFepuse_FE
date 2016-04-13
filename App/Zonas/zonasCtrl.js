ligaFepuseApp.controller('zonasCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
ngTableParams, torneoDataFactory, equipoDataFactory, zonasDataFactory, zonasTorneo) {

    //#region fpaz: Inicializacion de variables de Scope
    $scope.zonas = zonasTorneo;
    //#endregion

    

    //#region Dialog
    $scope.addZona = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogControllerTorneo,
            templateUrl: 'App/Zonas/Partials/nuevaZona.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen,

        })
        .then(function (zonas) {
            $scope.zonas = zonas;
        });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
    //#endregion  


})
function DialogControllerTorneo($scope, $mdDialog, $stateParams, zonasDataFactory) {

    $scope.saveZona = function (zona) {
        //$scope.equipoListadoPrueba.push(equipo);
        var torneoId = $stateParams.torneoId;

        var zonaAdd = {           
            Descripcion:zona.Descripcion,
            TorneoId: torneoId
        }

        zonasDataFactory.postZona(zonaAdd).then(function (response) {
            console.log("Zona Guardada")
            zonas = zonasDataFactory.getZonas(torneoId);
            $mdDialog.hide(zonas);
        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error al Guardar la Zona: " + $scope.error.Message);
            }
        });
    }   


    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}