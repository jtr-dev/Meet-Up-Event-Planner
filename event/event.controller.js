(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventController', EventController);

    EventController.$inject = ['$location', 'UserService', '$rootScope'];
    function EventController($location, UserService, $rootScope) {
        var vm = this;

        vm.event = event;
        vm.user = null;
        vm.allUsers = [];

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

