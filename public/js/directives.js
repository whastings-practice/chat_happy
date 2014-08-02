angular.module('ChatApp.directives')
.directive('chatRoom', function() {
  return {
    restrict: 'E',
    scope: {
      room: '='
    },
    templateUrl: 'views/chat_room.html'
  };
})
.directive('chatTabs', function(user) {
  return {
    controller: function($scope) {
      $scope.closeRoom = function(room) {
        user.leaveRoom(room);
      };
      $scope.switchRoom = function(room) {
        angular.forEach($scope.rooms, function(room) {
          room.current = false;
        });
        room.current = true;
      };
    },
    require: '^chatWindow',
    restrict: 'E',
    scope: {
      rooms: '='
    },
    templateUrl: 'views/chat_tabs.html'
  };
})
.directive('chatWindow', function() {
  return {
    restrict: 'E',
    scope: {
      rooms: '='
    },
    templateUrl: 'views/chat_window.html'
  };
})
.directive('fullHeight', function() {
  return {
    restrict: 'A',
    compile: function(element) {
      var pageHeight = document.documentElement.clientHeight - 80;
      element.css('height', pageHeight + 'px');
    }
  };
})
.directive('parentHeight', function() {
  return {
    restrict: 'A',
    compile: function(element) {
      var parentHeight = element.parent()[0].offsetHeight;
      element.css('height', parentHeight + 'px');
    }
  };
})
.directive('roomList', function() {
  return {
    restrict: 'E',
    scope: {
      rooms: '='
    },
    templateUrl: 'views/room_list.html'
  };
})
.directive('userList', function() {
  return {
    restrict: 'E',
    scope: {
      room: '='
    },
    templateUrl: 'views/user_list.html'
  };
});
