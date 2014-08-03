angular.module('ChatApp.directives')
.directive('fullHeight', function() {
  return {
    restrict: 'A',
    compile: function(element) {
      var pageHeight = document.documentElement.clientHeight - 80;
      element.css('height', pageHeight + 'px');
    }
  };
});
