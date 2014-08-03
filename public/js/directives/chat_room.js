angular.module('ChatApp.directives')
.directive('chatRoom', function() {
  return {
    link: function(scope, element) {
      var rawElement = element[0],
          height = rawElement.offsetHeight;
      scope.$watch('room.messages.length', function() {
        if ((height + rawElement.scrollTop - rawElement.scrollHeight) >= -18) {
          rawElement.scrollTop = rawElement.scrollHeight;
        }
      });
    },
    restrict: 'E',
    scope: {
      room: '='
    },
    templateUrl: 'chat_room.html'
  };
});
