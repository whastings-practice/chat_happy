angular.module('ChatApp.directives')
.directive('userList', function() {
  return {
    restrict: 'E',
    scope: {
      room: '='
    },
    templateUrl: 'user_list.html'
  };
});
