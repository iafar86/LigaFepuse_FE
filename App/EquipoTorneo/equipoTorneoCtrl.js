ligaFepuseApp.controller('equipoTorneoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia, ngTableParams,
    equipoTorneoDataFactory, tablaPosiciones, torneoDataFactory, equipoDataFactory) { 
    //#region fpaz: Inicializacion de Variables de Scope    
    $scope.tablaPosiciones = tablaPosiciones;
    $scope.editValue = false;
    //#endregion 

    //kike
    $scope.listadoEquiposTorneo = [];
    //kike

    //#region fpaz modificacion de datos de un equipo
    $scope.fechaHoraNueva = {};
    $scope.edit = function () {//fpaz: activa el modo de edicion de los campos        
        $scope.editValue = true;
    };

    $scope.saveUpdate = function () {//fpaz: guarda los cambios y llama a la funcion put de la api        
        equipoTorneoDataFactory.putEquipoTorneo($scope.tablaPosiciones).then(function (response) {
            $scope.editValue = false;
            alert("Cambios Guardados Correctamente");
            $scope.obtenerTablaPos();
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 $scope.cancel();
                 alert("Error al Modificar la Información: " + $scope.error.Message);
             }
         });
    };

    $scope.cancelEdit = function () {
        $scope.editValue = false;
        $scope.obtenerTablaPos();
    }

    $scope.obtenerTablaPos = function () {
        equipoTorneoDataFactory.getTablaPosiciones($stateParams.torneoId).then(function (response) {
            $scope.tablaPosiciones = response;
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error: " + $scope.error.Message);
             }
         });
    }
    //#endregion

    //#region fpaz: manejo de tabla
    var data = $scope.tablaPosiciones;
    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page      
        // initial sort order
        sorting: { Puntos: "desc" }
    }, {
        total: data.length, // saco el Total de registros del listado de escuelas
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                   $filter('filter')(data, params.filter()) :
                   data;

            var orderedData = params.sorting() ?
                   $filter('orderBy')(filteredData, params.orderBy()) :
                   data;

            $scope.tablaPosiciones = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve($scope.tablaPosiciones);
        }
    });
    //#endregion




    //<----Region de agregar equipos------>
    //#Region Dispara el modal para agregar equipos
    $scope.obtenerEquiposLiga = function () {
        torneoDataFactory.getTorneo($stateParams.torneoId).then(function (response) {
            $scope.listadoEquiposTorneo = response.EquipoTorneos;
        })
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
            controller: DialogEquipoTorneoController,
            templateUrl: 'App/Equipo/Partials/agregarEquipos.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: useFullScreen,
            equiposLiga: $scope.equiposLiga,
            torneo: $scope.torneoSelect,
            listadoEquiposTorneo: $scope.listadoEquiposTorneo
        })
        .then(function (listadoEquiposTorneo) {
            //$scope.obtenerEquipos();
            torneoDataFactory.getTorneo($stateParams.torneoId).then(function (response) {
                $scope.listadoEquiposTorneo = response.EquipoTorneos;
                var torneoId = $stateParams.torneoId;
                equipoTorneoDataFactory.getTablaPosiciones(torneoId).then(function (response) {
                    $scope.tablaPosiciones = response;
                });
            })
            //if (bandera == null) {
            //    $scope.torneoSelect = bandera;
            //    $scope.variable = bandera;
            //}
        });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
    //#end Region

    //<----EndRegion------>

})

function DialogEquipoTorneoController($scope, $mdDialog, equiposLiga, torneo, torneoDataFactory, listadoEquiposTorneo, equipoDataFactory) {
    $scope.equiposLiga = equiposLiga;
    $scope.equiposAdd = [];

    $scope.listadoTem = [];
    $scope.listadoEquiposTorneo = listadoEquiposTorneo;

    //Region agrega equipos a una lista temporal para agregar al torneo
    $scope.addCheck = function (equipo) {
        if (equipo.isChecked) {
            $scope.listadoTem.push(equipo);
        } else {
            var index = $scope.listadoTem.indexOf(equipo);
            $scope.listadoTem.splice(index, 1);
        }
    }
    //#endRegion

    //#Region alta de equipos en un torneo
    $scope.addEquipos = function (listadoTem)
    {
        for (i = 0; i < listadoTem.length; i++) {
            equipoAgregado = {
                EquipoId: listadoTem[i].Id
            }
            listadoEquiposTorneo.push(equipoAgregado);
        }


        //$scope.equiposAdd.push(equipoListadoPrueba);
        var torneoAdd = {
            Id: torneo.Id,
            Nombre: torneo.Nombre,
            AñoInicio: torneo.AñoInicio,
            AñoFin: torneo.AñoFin,
            LigaId: torneo.LigaId,
            EquipoTorneos: listadoEquiposTorneo
        };
        //Agrego los equipos al torneo
        torneoDataFactory.putTorneo(torneo.Id, torneoAdd).then(function (response) {
            alert("Se agregaron los equipos correctamente");
            $mdDialog.hide();
            //bandera = true;
            //$mdDialog.hide();
        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error al agregar equipos: " + $scope.error.Message);
            }
        })

    }
    //#endRegion

    var torneoViejo;
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
        $scope.hide(torneoViejo, bandera);

    }

    $scope.confirm = function () {
        $mdDialog.confirm();
    }

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.show = function () {
        $mdDialog.$scope
        $mdDialog.show;
    }
    $scope.cancel = function () {
        $scope = $scope.$new(true);
        $mdDialog.cancel();
    };

}