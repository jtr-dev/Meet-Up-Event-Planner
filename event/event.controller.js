(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventController', EventController);

    EventController.$inject = ['$location', 'UserService', '$rootScope'];
    function EventController($location, UserService, $rootScope, $http) {
        var vm = this;
        vm.data = {};
        vm.event = event;
        vm.user = null;
        vm.allUsers = [];
       
        // Form submit handler.
        vm.submit = function (eventForm) {
            // Trigger validation flag.
            vm.submitted = true;
            if (eventForm.$invalid) {
                return;
            }

            var config = {
                params: {
                    'callback': 'JSON_CALLBACK',
                    'eventname': vm.eventname,
                    'host': vm.host,
                    'whenStart': vm.whenStart,
                    'whenEnd': vm.whenEnd,
                    'allday': vm.allday,
                    'where': vm.where,
                    'description': vm.description,
                    'visibility': vm.visibility

                },
            };

            var $promise = $http.jsonp('response.json', config)
                .success(function (data, status, headers, config) {
                    if (data.status == 'OK') {
                        vm.eventname = null;
                        vm.host = null;
                        vm.whenStart = null;
                        vm.whenEnd = null;
                        vm.allday = null;
                        vm.where = null;
                        vm.description = null;
                        vm.visibility = null;
                        vm.messages = "Your event has been made!";
                        vm.submitted = false;

                    } else {
                        vm.messages = 'oops, error processing request.';
                        $log.error(data);
                    }
                })
                    .error(function (data, status, headers, config) {
                        vm.progress = data;
                        vm.messages = null;
                    }, 3000);
        };

        //vm.progress.addPromise($promise);
   


        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }


    }





})();

