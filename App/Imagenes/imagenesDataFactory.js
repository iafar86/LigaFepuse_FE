ligaFepuseApp.factory('imagenesDataFactory', function (Upload, $timeout, $http, $q) {
    var urlApi = "http://localhost:50174/"; //desarrollo
    var imagenesDataFactory = {};

    //fpaz: Upload de una imagen al Blob de Azure
    var _postImagen = function (file) {
        var deferred = $q.defer();
        file.upload = Upload.upload({
            url: urlApi +'api/Imagenes',
            data: { file: file },
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;                
                deferred.resolve(file.result);                
            });
        }, function (response) {
            if (response.status > 0)
                var errorMsg = response.status + ': ' + response.data;            
            deferred.reject(errorMsg);            
        });
        return deferred.promise;
    };

    
    imagenesDataFactory.postImagen = _postImagen;
    return imagenesDataFactory;
});

