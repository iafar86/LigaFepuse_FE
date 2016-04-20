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
            zonaDataFatory: 'zonaDataFactory',
            zonas: zonasTorneo

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