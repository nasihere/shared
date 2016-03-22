(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.news = {
            title: 'dashboard',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        vm.data = {};
        activate();
        getTestData();

        function activate() {
            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getTestData(){
            vm.data = [{
                         "name": "Microsoft hotmail",
                         "type": "Monitoring",
                         "days": [
                           {
                               "test":"T",
                               "Pass": 70,
                               "Fail": 5,
                               "History": [
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 6, "testFail": 2, "description": [{"tcName": "stock links are clickable" }, {"tcName": "Sports link is verified" }] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] }
                               ]
                             
                           },
                           {

                               "test":"T1",
                               "Pass": 130,
                               "Fail": 0,
                               "History": [
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] }
                               ]
                             
                           }    
                         ]
                        },
                        {
                         "name": "Yahoo ",
                         "type": "Monitoring",
                         "days": [
                           {
                               "test":"T",
                               "Pass": 70,
                               "Fail": 5,
                               "History": [
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 6, "testFail": 2, "description": [{"tcName": "stock links are clickable" }, {"tcName": "Sports link is verified" }] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] }
                               ]
                             
                           },
                           {

                               "test":"T1",
                               "Pass": 130,
                               "Fail": 0,
                               "History": [
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] }
                               ]
                             
                           }    
                         ]
                        },
                        {
                         "name": "hotmail",
                         "type": "Monitoring",
                         "days": [
                           {
                               "test":"T",
                               "Pass": 70,
                               "Fail": 5,
                               "History": [
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 6, "testFail": 2, "description": [{"tcName": "stock links are clickable" }, {"tcName": "Sports link is verified" }] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] }
                               ]
                             
                           },
                           {

                               "test":"T1",
                               "Pass": 130,
                               "Fail": 0,
                               "History": [
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] }
                               ]
                             
                           }    
                         ]
                        },
                        {
                         "name": "Microsoft hotmail",
                         "type": "Monitoring",
                         "days": [
                           {
                               "test":"T",
                               "Pass": 70,
                               "Fail": 5,
                               "History": [
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 6, "testFail": 2, "description": [{"tcName": "stock links are clickable" }, {"tcName": "Sports link is verified" }] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] }
                               ]
                             
                           },
                           {

                               "test":"T1",
                               "Pass": 130,
                               "Fail": 0,
                               "History": [
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] }
                               ]
                             
                           }    
                         ]
                        },
                        {
                         "name": "Microsoft hotmail",
                         "type": "Monitoring",
                         "days": [
                           {
                               "test":"T",
                               "Pass": 70,
                               "Fail": 5,
                               "History": [
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 6, "testFail": 2, "description": [{"tcName": "stock links are clickable" }, {"tcName": "Sports link is verified" }] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] }
                               ]
                             
                           },
                           {

                               "test":"T1",
                               "Pass": 130,
                               "Fail": 0,
                               "History": [
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] },
                                 { "testCase": 8, "testPass": 8, "testFail": 0, "description": [] }
                               ]
                             
                           }    
                         ]
                        }]

        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.people = data;
                return vm.people;
            });
        }
    }
})();
