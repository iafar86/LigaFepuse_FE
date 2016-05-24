ligaFepuseApp.controller('noticiasCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, $mdMedia,
ngTableParams, noticiasDataFactory, listNoticias) {

    //#region Inicializacion de Variables de Scope
    $scope.noticias = listNoticias;
    //#endregion
})
