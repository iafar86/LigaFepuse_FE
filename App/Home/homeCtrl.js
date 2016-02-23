ligaFepuseApp.controller('homeCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
    ngTableParams, torneosList, torneoDataFactory, fechaDataFactory, equipoTorneoDataFactory) {



    //#region Carga de datos para tabla de posiciones
    $scope.torneos = torneosList;
    $scope.FechasInfo=[];
    $scope.torneoSelect = 1;
    $scope.equiposCount = 0;
    $scope.tablaShow = function () {
        var torneoId = $scope.torneoSelect;
        equipoTorneoDataFactory.getTablaPosiciones(torneoId).then(function (response) {
            $scope.tablaPos = response;
            $scope.equiposCount = response.length;
        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error: " + $scope.error.Message);
            }
        });

        fechaDataFactory.getFechasTorneo(torneoId).then(function (response) {
            $scope.FechasInfo=response;
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error: " + $scope.error.Message);
             }
         });

    };

    $scope.query = {
        //order: 'name',
        limit: 5,
        page: 1
    };

    //#endregion

    //#region Tabs de Fechas
    $scope.tabs = [
          { title: 'One', content: "Tabs will become paginated if there isn't enough room for them." },
          { title: 'Two', content: "You can swipe left and right on a mobile device to change tabs." },
          { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element." },
          { title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected." },
          { title: 'Five', content: "If you remove a tab, it will try to select a new one." },
          { title: 'Six', content: "There's an ink bar that follows the selected tab, you can turn it off if you want." },
          { title: 'Seven', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab." },
          { title: 'Eight', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!" },
          { title: 'Nine', content: "If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs." },
          { title: 'Ten', content: "If you're still reading this, you should just go check out the API docs for tabs!" }
    ]
    $scope.topIndex = "1";
    //#endregion


   

});