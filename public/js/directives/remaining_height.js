angular.module('ChatApp.directives')
.directive('remainingHeight', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      var parent = element.parent(),
          parentHeight = parent[0].offsetHeight,
          startY = element[0].offsetTop;
      element.css('height', (parentHeight - startY - 5) + 'px');
    }
  };
});
