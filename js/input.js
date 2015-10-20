var inputController = {};

inputController.actions = [];
inputController.keys = {
  38: 'up',
  40: 'down',
  37: 'left',
  39: 'right',
};

window.document.onkeydown = function(key_event) {
  var k = key_event.keyCode;
  var action = inputController.keys[k];
  if (action !== undefined) {
    key_event.preventDefault();
    inputController.actions.push(action);
  }
  return false;
};

module.exports = inputController;
