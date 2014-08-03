angular.module('ChatApp.directives')
.directive('chatWindow', function() {
  return {
    restrict: 'E',
    scope: {
      rooms: '='
    },
    templateUrl: 'chat_window.html'
  };
});
