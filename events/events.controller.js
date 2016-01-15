﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventsController', EventsController);

    EventsController.$inject = ['EventService', '$rootScope'];
    function EventsController(EventService, $rootScope) {
        var vm = this;

        vm.event = null;
        vm.allEvents = [];
        vm.deleteEvent = deleteEvent;

        initController();

        function initController() {
            //loadCurrentEvent();
            loadAllEvents();
        }

        //function loadCurrentEvent() {
        //    EventService.GetByEventName($rootScope.globals.currentEvent.eventName)
        //        .then(function (event) {
        //            vm.event = event;
        //        });
        //}

        function loadAllEvents() {
            EventService.GetAll()
                .then(function (events) {
                    vm.allEvents = events;
                });
        }

        function deleteEvent(id) {
            EventService.Delete(id)
            .then(function () {
                loadAllEvents();
            });
        }
    }

})();