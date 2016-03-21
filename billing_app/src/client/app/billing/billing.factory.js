angular.module('app.billing')
.factory('API', function($http) {
    var myService = {
        call: function(HttpQry) {
                    
                 var url = httpApiURL +"api/SalesBooks?"+ HttpQry;
                 var promise = $http.get(url).then(function (response) {
                   // console.log(response);
                    return response.data;
                  });
                  return promise;
                },
          post: function(HttpQry, Paramter) {
                    
                 var url = httpApiURL +"api/SalesBooks?"+ HttpQry;
                 var promise = $http.post(url,Paramter).then(function (response) {
                   // console.log(response);
                    return response.data;
                  });
                  return promise;
                },

          searchBarcode: function(paramter) {
                    //http://localhost:3002/api/PurchaseBooks
                    // ?filter[fields][barcodeNo]=true&filter[where][barcodeNo][like]=test%

                 var url = httpApiURL +"api/PurchaseBooks?filter[fields][barcodeNo]=true&filter[where][barcodeNo][like]="+paramter+"%";
                 var promise = $http.get(url).then(function (response) {
                   // console.log(response);
                    return response.data;
                  });
                  return promise;
                },

      };

      return myService;

    });

