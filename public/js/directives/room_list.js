angular.module('ChatApp.directives')
.directive('roomList', function() {
  return {
    controller: function($scope) {
      $scope.newRoomName = '';

      $scope.createRoom = function() {
        $scope.user.joinRoom($scope.newRoomName);
        $scope.newRoomName = '';
      };

      $scope.joinRoom = function(room) {
        $scope.user.joinRoom(room);
      };
    },
    restrict: 'E',
    scope: {
      close: '&onClose',
      rooms: '=',
      user: '='
    },
    templateUrl: 'views/room_list.html'
  };
});
