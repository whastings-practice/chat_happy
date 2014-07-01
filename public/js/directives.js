angular.module('ChatApp.directives')
.directive('fullHeight', function() {
  return {
    restrict: 'A',
    compile: function(element) {
      var pageHeight = document.documentElement.clientHeight - 30;
      element.css('height', pageHeight + 'px');
    }
  };
})
.directive('parentHeight', function() {
  return {
    restrict: 'A',
    compile: function(element) {
      var parentHeight = element.parent()[0].offsetHeight;
      element.css('height', parentHeight + 'px');
    }
  };
});
