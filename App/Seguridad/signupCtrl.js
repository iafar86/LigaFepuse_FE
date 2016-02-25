ligaFepuseApp.controller('signupCtrl', function ($scope, $location, $timeout, authSvc) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {//model para la vista signup
        userName: "",
        password: "",
        confirmPassword: ""
    };

    $scope.signUp = function () { // funcion para el login de usuario
        $scope.registration.UsrId = 1;
        authSvc.saveRegistration($scope.registration).then(function (response) { //lamo al servicio para registrar un nuevo usuario

            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
            startTimer();

        },
         function (response) {// si sale error devuelvo el mensaje devuelto en el response
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to register user due to:" + errors.join(' ');
         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/Inicio/Login');
        }, 2000);
    }

});