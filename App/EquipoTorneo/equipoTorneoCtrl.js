ligaFepuseApp.controller('equipoTorneoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia, ngTableParams,
    equipoTorneoDataFactory, tablaPosiciones) {
    //#region fpaz: Inicializacion de Variables de Scope    
    $scope.tablaPosiciones = tablaPosiciones;
    $scope.editValue = false;
    //#endregion 

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
})

