ligaFepuseApp.controller('arbitroCtrl', function ($scope, $stateParams,$mdDialog, arbitroDataFactory, arbitroList) {
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




})

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
