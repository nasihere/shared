(function() {
    'use strict';

    angular
        .module('app.billing')
        .controller('topNavController', topNavController)
         .directive('topNav', topNav)


  topNavController.$inject = ['API','$q','$scope'];


    /* @ngInject */
    function topNavController (API,$q,$scope) {
        var vm = this;
        $scope.$watch(
		    "vm.searchText",
		    function handleFooChange( newValue, oldValue ) {
		        console.log( "vm.fooCount:" +  oldValue  + " - " + newValue );
		    }
		);


		vm.getMatches = function(SearchTerm){
			 var q = $q.defer();
			API.searchBarcode(SearchTerm).then(function(response){
				q.resolve( response );

					
			}); 	
			return q.promise;
		}




    }
    function topNav(){
    	  var directive = {
		        link: link,
		        templateUrl: 'app/billing/billing-top-nav.html',
		        restrict: 'EA',
		        scope: {
		         //   max: '='
		        },
		        controller: topNavController,
		        controllerAs:"vm"
		    };
		    return directive;

		    function link(scope, element, attrs) {
		      /* */
		    }
    }
       
})();
