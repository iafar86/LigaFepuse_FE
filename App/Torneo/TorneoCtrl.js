ligaFepuseApp.controller('torneoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, ngTableParams, torneoDataFactory, torneoList)
{
    $scope.torneos = torneoList;

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
    
})