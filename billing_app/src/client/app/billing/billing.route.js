(function() {
    'use strict';

    angular
        .module('app.billing')
        .run(appRun)
        
       
    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'billing',
                config: {
                    url: '/billing',
                    templateUrl: 'app/billing/billing.html',
                    controller: 'BillingController',
                    controllerAs: 'vm',
                    title: 'billing',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-cart"></i> FastBill'
                    }
                   // templateUrl: 'app/billing/billing.html',
                  //   controller: 'BillingController',
                   // controllerAs: 'vm',
                   
                }
            }
        ];
    }
})();
