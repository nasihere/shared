angular.module('app', ['ngNewRouter'])
  .controller('AppController', ['$router', AppController]);

AppController.$routeConfig = [
  { path: '/',           component: 'lock' }
];
function AppController ($router) {}




/*


app.factory('API', function($http) {

var myService = {
    call: function() {
                console.log(HttpUrl +"?"+ HttpQry);
              var promise = $http.post(HttpUrl +"?"+ HttpQry).then(function (response) {
                console.log("API CALL() "+HttpQry);
                console.log(response);
                return response.data;
              });
              return promise;
            },

  };

  return myService;

});*/