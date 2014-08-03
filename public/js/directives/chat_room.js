angular.module('ChatApp.directives')
.directive('chatRoom', function() {
  return {
    restrict: 'E',
    scope: {
      room: '='
    },
    templateUrl: 'views/chat_room.html'
  };
});
