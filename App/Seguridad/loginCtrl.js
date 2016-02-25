ligaFepuseApp.controller('loginCtrl', function ($scope, $location, $timeout, authSvc) {
    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {

        authSvc.login($scope.loginData).then(function (response) {
            alert("Login Exitoso");
            $location.path('/App/Home');

        },
         function (err) {
             if (err) {
                 $scope.message = err.error_description;
             }

             
         });
    };
});