angular.module('ChatApp.directives')
.directive('userSettings', function() {
  return {
    restrict: 'E',
    scope: {
      user: '='
    },
    templateUrl: 'user_settings.html'
  };
});
