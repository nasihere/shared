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
                    url: '/billing/:id',
                    templateUrl: 'app/billing/billing.html',
                     controller: 'BillingController',
                    controllerAs: 'vm',
                    title: 'Billing',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }
        ];
    }
})();
