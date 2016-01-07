(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventController', EventController);

    EventController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function EventController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.event = event;




    }
})();


//todo:  datetimepicker is not a function
