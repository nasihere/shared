var Root = {
	"Bill_No":"",
	"det":[],
	"GiftVouchers":[]
};

var ChangeEvent = false;

angular.module('app.billing')
  .controller('BillingController', BillingController);

  BillingController.$inject = ['$stateParams','$q','$scope'];
    
function BillingController($stateParams,$q,$scope) {
	// alert(  $stateParams.id);
	var vm = this;
    


};

