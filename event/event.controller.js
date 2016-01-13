(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventController', EventController);

    EventController.$inject = ['$location', 'UserService', '$rootScope', 'FlashService'];
    function EventController($location, UserService, FlashService, $rootScope, $http, $log, $timeout) {
        var vm = this;
        vm.data = {};
        vm.event = event;



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

            $http.post('response.json', config, data)
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
                       vm.error(data);
                   }
               })
                   .error(function (data, status, headers, config) {

                       vm.messages = 'network error. Try again';
                       vm.log.error(data);
                   })
           .finally(function () {
               $timeout(function () {
                   vm.messages = null;
               }, 3000);
           });





            vm.user = null;
            vm.allUsers = [];
            vm.deleteUser = deleteUser;

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

            function deleteUser(id) {
                UserService.Delete(id)
                .then(function () {
                    loadAllUsers();
                });
            }






        }
    }
})();