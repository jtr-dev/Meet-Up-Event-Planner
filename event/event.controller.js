(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventController', EventController);

    EventController.$inject = ['$location', 'UserService', 'EventService', '$rootScope', '$http'];
    function EventController($location, UserService, EventService, $rootScope, $http) {

      
        var vm = this;
        vm.model = {};
        vm.states = {
            showEvents: false
        };
    

        vm.new = {
            Event: {}
        };

     
        var data = vm.event;

        
        function event() {
            vm.dataLoading = true;
            EventService.Create(vm.event)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Event created successful', true);
                        $location.path('/events');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }




     

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

