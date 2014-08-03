angular.module('ChatApp.directives')
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
    templateUrl: 'chat_tabs.html'
  };
});
