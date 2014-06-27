window.ChatApp.controller('WindowController', function($scope, socket) {
  var self = this;
  this.messages = [];

  socket.on('new_message', function(data) {
    $scope.$apply(function() {
      self.messages.push(data.message);
    });
  });
});
