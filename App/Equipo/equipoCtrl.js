﻿ligaFepuseApp.controller('equipoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    ngTableParams, torneoList, equiposLiga, arbitroList, equipoDataFactory, torneoDataFactory, arbitroDataFactory) //, equipoDataFactory, torneoDataFactory, arbitroDataFactory, torneoList, equiposLiga, arbitroList
{
    $scope.torneos = torneoList;// trae todos los torneos de la liga
    $scope.listadoEquiposTorneo = [];// guarda los equipos de un torneo

    $scope.equiposLiga = [];// guarda todos los torneos de la liga
    $scope.equiposLiga = equiposLiga; // revisar porque trae un arreglo adentro de otro kikexp

    //#Region Obtiene los equipos de un torneo
    $scope.obtenerEquipos = function () {
        torneoDataFactory.getTorneo($scope.torneoSelect.Id).then(function (response) {
            $scope.listadoEquiposTorneo = response.EquipoTorneos;
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
            listadoEquiposTorneo: $scope.listadoEquiposTorneo
        })
        .then(function (listadoEquiposTorneo) {
            //$scope.obtenerEquipos();
            torneoDataFactory.getTorneo($scope.torneoSelect.Id).then(function (response) {
                $scope.listadoEquiposTorneo = response.EquipoTorneos;
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
                listadoEquiposTorneo: $scope.listadoEquiposTorneo,
            })
            .then(function () {
                equipoDataFactory.getEquiposLiga().then(function (response) {
                    $scope.equiposLiga = response;
                },
                function (err) {
                    if (err) {
                        $scope.error = err;
                        alert("Error: " + $scope.error.Message);
                    }
                });
            });
            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
    }
    //#endRegion


    //#region Paginacion de la tabla dinamica de Dictamenes (se puede llenar con dictamenes Institucionales o Jurisdiccionales segun la opcion elegida)
    var data = $scope.equiposLiga;
    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 3,          // count per page        
        filter: {
            // filtros de la tabla, 
            Nombre: '' //por numero de nrodictamen       
            //codplanmejora: ''// por nombre de codplanmejora
        }
        //sorting: {
        //    name: 'asc'
        //}
    }, {
        total: data.length, // saco el Total de registros del listado de escuelas
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                   $filter('filter')(data, params.filter()) :
                   data;

            var orderedData = params.sorting() ?
                   $filter('orderBy')(filteredData, params.orderBy()) :
                   data;

            $scope.equiposLiga = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve($scope.equiposLiga);
        }
    });
    //#endregion






    //<-------REGION ARBITRO---------------->
    $scope.arbitroList = arbitroList;
    //#region Inicializacion de Variables de Scope

    //#endregion

    $scope.arbitroAdd = function () {
        $mdDialog.show({
            //scope: $scope,
            controller: DialogArbitroController,
            //targetEvent: $event,
            templateUrl: 'App/Arbitro/Partials/arbitroInfo.html',
            locals: {
                arbitroShow: new Object(),
                edit: false,
                func: "Nuevo"
            } //paso de scope
        }).then(function (response) {
            if (response == "ok") { //iafar: se guardo nuevo arbitro?
                alert('guardo un arbitro, actualizar lista ' + response)
            } else {
                alert('Le dio a cancelar ' + response)
            }
        })
    }

    $scope.arbitroInfo = function (arbitroSelect) {
        $mdDialog.show({
            //scope: $scope,
            controller: DialogArbitroController,
            //targetEvent: $event,
            templateUrl: 'App/Arbitro/Partials/arbitroInfo.html',
            locals: {
                arbitroShow: arbitroSelect,
                edit: true,
                func: "Informacion de "
            } //paso de scope
        }).then(function (response) {
            if (response == "ok") { //iafar: se guardo nuevo arbitro?
                alert('Edito un jugador, actualizar lista ' + response)
            } else {
                alert('Le dio a cancelar ' + response)
            }
        })
    }

    //<-------END REGION---------->

    //#region Imprimir listado
    $scope.printToCart = function (printSectionId) {
        
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head> <link rel="stylesheet" href="libs/assets/animate.css/animate.css" type="text/css" /><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"><link rel="stylesheet" href="libs/angular/angular-loading-bar/build/loading-bar.css" type="text/css" /><link rel="stylesheet" href="libs/angular/angular-material/angular-material.css" type="text/css" /><link rel="stylesheet" href="styles/material-design-icons.css" type="text/css" /><link rel="stylesheet" href="styles/app.min.css" type="text/css" /><link href="libs/angular/angular-material/angular-material.min.css" rel="stylesheet" /><script src="libs/angular/angular-material/angular-material.min.js"></script><script src="libs/angular/angular-material-icons/angular-material-icons.min.js"></script><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');  
        popupWinindow.document.close();
    }

    
    //#endRegion




})



//#Region controller Dialog
function DialogController($scope, $mdDialog, equiposLiga, torneo, torneoDataFactory, listadoEquiposTorneo, equipoDataFactory) {

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
        $scope.hide(torneoViejo,bandera);
        
    }

    //#Region alta de equipos en un torneo
    $scope.addEquipos = function (listadoTem)
    {
        for (i=0; i< listadoTem.length; i++) {
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

    //alta de equipo en la Liga
    $scope.addEquipo = function (equipo) {
        equipo.LigaId = 1;
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
        $mdDialog.hide($scope.equiposLiga);
       
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

    $scope.confirm = function () {
        $mdDialog.confirm();
    }

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.show = function()
    {
        $mdDialog.$scope
        $mdDialog.show;
    }
    $scope.cancel = function () {
        $scope = $scope.$new(true);
        $mdDialog.cancel();
    };
}
//#endRegion



//<--------REGION DIALOG ARBITRO------------>
function DialogArbitroController($scope, $mdDialog, arbitroShow, edit, func, arbitroDataFactory) {

    //#region inicializacion de scope
    $scope.arbitro = arbitroShow;
    $scope.arbitro.LigaId = 1;
    $scope.edit = edit; //iafar: indica si los campos estan habilitados para edicion o no
    $scope.func = func;//iafar: cadena que expresa que tipo de operacion hara el modal

    //#endregion


    $scope.closeDialog = function (response) {

        $mdDialog.hide(response);

    };

    $scope.editArbitro = function () {
        $scope.edit = false;
        $scope.func = "Edicion de "
    }

    $scope.guardarArbitro = function () {


        if ($scope.func == "Nuevo") {
            //iafar: nuevo arbitro

            arbitroDataFactory.postArbitro($scope.arbitro);//iafar: trabajar con un promise

        } else {
            //iafar: se modifica un jugador
            arbitroDataFactory.putArbitro($scope.arbitro.Id, $scope.arbitro);

        }
        $scope.closeDialog("ok");
    }


}
//<----------END REGION ARBITRO--------------->