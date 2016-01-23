ligaFepuseApp.controller('jugadorCtrl', function ($scope, $stateParams, $state, $filter) {
    $scope.jugador = [];
    $scope.jugador.FichaMedica = "No";
    $scope.jugador.Federado = "No";

    $scope.profesiones = [
        { Id: 1, Nombre: "Contador" },
        { Id: 2, Nombre: "Ingeniero" },
        { Id: 3, Nombre: "Adm. Publica" },
        { Id: 4, Nombre: "Escribano" }
    ]



})