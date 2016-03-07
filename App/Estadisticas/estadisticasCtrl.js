ligaFepuseApp.controller('estadisticasCtrl', function ($scope, $stateParams, $state, $filter, ngTableParams, estadisticasDataFactory, estadisticasTorneo) {
    //#region fpaz: Inicializacion de Variables de Scope
    $scope.torneo = estadisticasTorneo.Torneo; //fpaz: tiene la info del torneo
    $scope.listGoleadores = estadisticasTorneo.Goleadores; //fpaz: listado de goleadores del torneo
    $scope.listAmonestados = estadisticasTorneo.Amonestados; //fpaz: listado de Amonestados del torneo
    $scope.listExpulsados = estadisticasTorneo.Expulsados; //fpaz: listado de goleadores del torneo
    //#endregion

    //#region fpaz: manejo de tabla de Goleadores
    var dataGoleadores = $scope.listGoleadores;
    $scope.tableGoleadores = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page      
        // initial sort order
        sorting: { Goles: "desc" }
    }, {
        total: dataGoleadores.length, // saco el Total de registros del listado de Goleadores
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                   $filter('filter')(dataGoleadores, params.filter()) :
                   dataGoleadores;

            var orderedData = params.sorting() ?
                   $filter('orderBy')(filteredData, params.orderBy()) :
                   dataGoleadores;

            $scope.listGoleadores = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve($scope.listGoleadores);
        }
    });
    //#endregion

    //#region fpaz: manejo de tabla de Amonestados
    var dataAmonestados = $scope.listAmonestados;
    $scope.tableAmonestados = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page      
        // initial sort order
        sorting: { CantTarjAmarillas: "desc" }
    }, {
        total: dataAmonestados.length, // saco el Total de registros del listado de Goleadores
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                   $filter('filter')(dataAmonestados, params.filter()) :
                   dataAmonestados;

            var orderedData = params.sorting() ?
                   $filter('orderBy')(filteredData, params.orderBy()) :
                   dataAmonestados;

            $scope.listAmonestados = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve($scope.listAmonestados);
        }
    });
    //#endregion

    //#region fpaz: manejo de tabla de Expulsados
    var dataExpulsados = $scope.listExpulsados;
    $scope.tableExpulsados = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page      
        // initial sort order
        sorting: { CantTarjRojas: "desc" }
    }, {
        total: dataExpulsados.length, // saco el Total de registros del listado de Goleadores
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                   $filter('filter')(dataExpulsados, params.filter()) :
                   dataExpulsados;

            var orderedData = params.sorting() ?
                   $filter('orderBy')(filteredData, params.orderBy()) :
                   dataExpulsados;

            $scope.listExpulsados = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve($scope.listExpulsados);
        }
    });
    //#endregion
})
