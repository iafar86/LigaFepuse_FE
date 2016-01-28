ligaFepuseApp.controller('torneoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia, ngTableParams, torneoDataFactory, torneoList, infoTorneo, fechaDataFactory, equipoDataFactory, arbitroDataFactory)
{
    $scope.torneos = torneoList;

    $scope.torneo = infoTorneo;

    $scope.imagen = 'img/fepuse.jpg'

    $scope.torneoListado = [];
    $scope.torneoAdd = function () {
        torneoTemp = {
            Id: $scope.torneo.Id,
            Nombre: $scope.torneo.Nombre,
            AnioInicio: $scope.torneo.AnioInicio,
            AnioFin: $scope.torneo.AnioFin
        }
        $scope.torneoListado.push(torneoTemp);
        $scope.variable = false;
        $scope.torneo.Nombre = '';
        $scope.torneo.AnioInicio = '';
        $scope.torneo.AnioFin = ''      
    }

    torneoDel = function (item) {
        var index = $scope.torneoListado.indexOf(item);
        $scope.torneoListado.splice(index, 1);
    }

    //Confirmar Eliminar
    var txt;
    $scope.confirmar = function (torneo) {
        r = confirm("Desea eliminar: " + torneo.Nombre)
        if (r == true) {
            torneoDel();
        }
    }

    //region Dialog
    $scope.nuevoTorneo = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogControllerTorneo,
            templateUrl: 'App/torneo/Partials/nuevoTorneo.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
            
        })
        .then(function (torneos) {
            $scope.torneos = torneos;
        });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
    //endRegion  

    //fpaz: funcion para ir al detalle del torneo y mostrar el fixture de la primera fecha si es que tiene alguna fecha cargada, sino muestra la vista para administracion del torneo
    $scope.verDetalle = function (torneoId) {
        fechaDataFactory.getPrimeraFecha(torneoId).then(function (response) {
            console.log("Trajo el id de la primera fecha: " + response);
            $state.go('torneo.info.fecha', { torneoId: torneoId, fechaId: response });
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error: " + $scope.error.Message);
             }
         });
    }
    //#region fpaz: Altas de Fechas y Partidos
    //#region fpaz: funcion para dar de alta una fecha
    $scope.addFecha = function (ev) {        
        $mdDialog.show({
            controller: 'fechaCtrl',
            templateUrl: 'App/Fecha/Partials/fechaAdd.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            resolve: {
                listPartidos: function () {
                    return { value: [] };
                },
                listEquipos: function () {
                    return $scope.torneo.Equipos;
                },                
                infoTorneo: function () {
                    return $scope.torneo;
                },                
                listArbitros: function (arbitroDataFactory) {
                    return arbitroDataFactory.getArbitros();
                }                
            }
        })
            .then(function () {
                //$scope.listTiposHab[$scope.selectedIndex].Habitaciones.push(habitacion);
            }, function () {
                //alert('Error Al Guardar La Nueva Habitacion');

            });
    };
    //#endregion

    //#region fpaz: funcion para dar de alta un partido para la fecha seleccionada
    $scope.addPartido = function (ev) {        
        if ($scope.torneo.Fechas.length < 1) {
            alert("Primero Debe Agregar una Fecha");
        } else {
            $mdDialog.show({
                controller: 'partidoCtrl',
                templateUrl: 'App/Partido/Partials/partidoAdd.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    listPartidos: function () {
                        return { value: [] };
                    },
                    listEquipos: function () {
                        return $scope.torneo.Equipos;
                    },
                    infoTorneo: function () {
                        return $scope.torneo;
                    },
                    listArbitros: function (arbitroDataFactory) {
                        return arbitroDataFactory.getArbitros();
                    }                    
                }
            })
              .then(function () {
                  //$scope.listTiposHab[$scope.selectedIndex].Habitaciones.push(habitacion);
              }, function () {
                  //alert('Error Al Guardar La Nueva Habitacion');

              });
        }
        
    };
    //#endregion
    //#endregion
})
function DialogControllerTorneo($scope, $mdDialog, torneoDataFactory) {

    $scope.addTorneo = function (torneo) {
        //$scope.equipoListadoPrueba.push(equipo);
        //torneo.TorneoId = $scope.torneo.Id;
        var torneoAdd = {
            LigaId: 2,
            Nombre: torneo.Nombre,
            AñoInicio: torneo.AnioInicio,
            AñoFin: torneo.AnioFin
        }
        
        torneoDataFactory.postTorneo(torneoAdd).then(function (response) {
            alert("Nuevo torneo guardado");
            
            torneos = torneoDataFactory.getTorneos();
            $mdDialog.hide(torneos);
        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error al Guardar el torneo: " + $scope.error.Message);
            }
        });
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