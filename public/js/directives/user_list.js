angular.module('ChatApp.directives')
.directive('userList', function() {
  return {
    restrict: 'E',
    scope: {
      room: '='
    },
    templateUrl: 'views/user_list.html'
  };
});
