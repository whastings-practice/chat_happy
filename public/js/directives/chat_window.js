angular.module('ChatApp.directives')
.directive('chatWindow', function() {
  return {
    restrict: 'E',
    scope: {
      rooms: '='
    },
    templateUrl: 'views/chat_window.html'
  };
});
