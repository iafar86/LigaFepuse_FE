ligaFepuseApp.controller('zonasCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
ngTableParams, torneoDataFactory, equipoDataFactory, zonasDataFactory, zonasTorneo, zona) {

    //#region fpaz: Inicializacion de variables de Scope
    $scope.editValue = false;
    $scope.zonas = zonasTorneo;
    $scope.zona = zona;
    //#endregion

    //#region fpaz: Modificacion de Info de la Zona
    $scope.obtenerZona = function () { //fpaz: obtiene la info de la zona que se esta modificando
        zonasDataFactory.getZona($stateParams.zonaId).then(function (response) {
            $scope.zona = response;
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error: " + $scope.error.Message);
             }
         });
    }
    //#endregion

    //#region fpaz: Dialog para Agregar Zonas al Torneo
    $scope.addZona = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogControllerZona,
            templateUrl: 'App/Zonas/Partials/zonaAdd.html',
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

    function DialogControllerZona($scope, $mdDialog, $stateParams, zonasDataFactory) {

        $scope.saveZona = function (zona) {
            var torneoId = $stateParams.torneoId;

            var zonaAdd = {
                Descripcion: zona.Descripcion,
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
    //#endregion  

    //#region fpaz: Dialog para agregar Equipos a la Zona
    $scope.equiposLiga = [];
    $scope.addEquipo = function () {        
        equipoDataFactory.getEquiposLiga().then(
        function (response) {
            $scope.equiposLiga = response;
            $scope.seleccionEquipos();
        },
        function (err) {
            $scope.error = err;
            alert("Error: " + $scope.error.Message);
        });
    };

    $scope.seleccionEquipos = function (ev) {          
        var equipos = $scope.equiposLiga;

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogEquipoZonaController,
            templateUrl: 'App/Equipo/Partials/agregarEquipos.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: useFullScreen,
            equiposLiga: equipos ,                        
            listadoEquiposZona: $scope.zona.EquiposTorneo,
            zona: $scope.zona
        })
        .then(function () {            
            $scope.obtenerZona();
        });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

    //#region controller Dialog
    function DialogEquipoZonaController($scope, $mdDialog, equiposLiga, zona,listadoEquiposZona) {

        $scope.equiposLiga = equiposLiga;
        $scope.equiposAdd = [];

        $scope.listadoTem = [];
        $scope.listadoEquiposZona = listadoEquiposZona;

        $scope.zona = zona

        //#region agrega equipos a una lista temporal para agregar a la zona
        $scope.addCheck = function (equipo) {
            if (equipo.isChecked) {
                $scope.listadoTem.push(equipo);
            } else {
                var index = $scope.listadoTem.indexOf(equipo);
                $scope.listadoTem.splice(index, 1);
            }
        }
        //#endregion

        //#region alta de equipos en una Zona
        $scope.addEquipos = function (listadoTem) {
            for (i = 0; i < listadoTem.length; i++) {
                equipoAgregado = {
                    EquipoId: listadoTem[i].Id
                }
                listadoEquiposZona.push(equipoAgregado);
            }

            $scope.zona.EquiposTorneo = listadoEquiposZona; //fpaz: actualizo el listado de equipos de la zona

            //Agrego los equipos a la zona
            zonasDataFactory.putZona($scope.zona.Id, $scope.zona).then(function (response) {
                alert("Se agregaron los equipos correctamente");
                $mdDialog.hide();
            },
            function (err) {
                if (err) {
                    $scope.error = err;
                    alert("Error al agregar equipos: " + $scope.error.Message);
                }
            })

        }
        //#endregion

        $scope.cancelar = function () {
            $mdDialog.cancel();
        }
        
    }
    //#endregion

    //#endregion
})
