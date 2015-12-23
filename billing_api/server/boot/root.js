module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};


//http://localhost:3000/api/SalesBooks?filter[include]=SalesBookdet&filter[where][Bill_No]=8804

//http://localhost:3000/api/PurchaseBooks?filter[include]=PurchaseBookdet

