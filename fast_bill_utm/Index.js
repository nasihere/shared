angular.module('app', ['ngNewRouter','app.lock','app.billing','app.purchase','app.reports'])
  .controller('AppController', ['$router', AppController]);

AppController.$routeConfig = [
  { path: '/',           component: 'lock' },
  { path: '/billing',           component: 'billing' },
  { path: '/purchase',           component: 'purchase' },
  { path: '/reports',           component: 'reports' }
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