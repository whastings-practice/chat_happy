angular.module('ChatApp.directives')
.directive('userSettings', function() {
  return {
    restrict: 'E',
    scope: {
      user: '='
    },
    templateUrl: 'views/user_settings.html'
  };
});
