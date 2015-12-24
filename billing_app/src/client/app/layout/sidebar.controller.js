(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$state', 'routerHelper','$mdSidenav'];
    /* @ngInject */
    function SidebarController($state, routerHelper,$mdSidenav) {
        var vm = this;
        var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;

        activate();

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            vm.myROutes = states;//.filter(function(r) {
            // vm.navRoutes = states.filter(function(r) {
            //     return r.settings && r.settings.nav;
            // }).sort(function(r1, r2) {
            //     return r1.settings.nav - r2.settings.nav;
            // });

            vm.navRoutes = [
                {"name":"Billing","icon":"phone", "route":"billing"},
                {"name":"Sales Book","icon":"menu","route":"dashboard"},
                {"name":"Reports","icon":"phone","route":"blocks"}
            ];
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'selected' : '';
        }
        function openLeftMenu() {
            $mdSidenav('left').toggle();
        };
    }
})();

