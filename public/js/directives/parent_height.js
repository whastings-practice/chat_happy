angular.module('ChatApp.directives')
.directive('parentHeight', function() {
  return {
    restrict: 'A',
    compile: function(element) {
      var parentHeight = element.parent()[0].offsetHeight;
      element.css('height', parentHeight + 'px');
    }
  };
});
