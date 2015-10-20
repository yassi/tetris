var util = {};

util.colors = {
  0: '#ecf0f1', // clouds
  1: '#2c3e50', // midnight blue
  2: '#2ecc71', // green
  3: '#ffc40d', // yellow
  4: '#19b5fe', // dodger blue
  5: '#bf55ec', // purple
  6: '#f89406', // orange
  7: '#ff0097', // magenta
  8: '#e74c3c', // alizarin (red)
};

var w = window;

w.performance = w.performance || {};
w.performance.now = (function() {
  return w.performance.now ||
    w.performance.mozNow ||
    w.performance.msNow ||
    w.performance.oNow ||
    w.performance.webkitNow ||
    function() {
      return new Date().getTime();
    };
}());

util.requestAnimationFrame = w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

util.timestamp = function() {
  return w.performance.now();
};

util.printBoard = function(arr) {
  var str = '';
  for (var i = 0; i < arr.length; i++) {
    if (i !== 0) {
      str += '\n';
    }
    for (var j = 0; j < arr[i].length; j++) {
      str += arr[i][j] + ' ';
    }
  }
  console.log(str);
};

util.paddedArray = function(size, padValue) {
  var arr = new Array(size);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = padValue;
  }
  return arr;
};

util.arraySum = function(arr, start, end) {
  arr.slice(start, end)
    .reduce(function(prev, curr, index, array) {
      return prev + curr;
    });
};

util.arrayShuffle = function(arr) {
  var j;
  var i;
  var temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    // Swap
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

util.arrayRepeat = function(arr, n) {
  var a = [];
  for (var i = 0; i < n; i++) {
    a = a.concat(arr);
  }
  return a;
};

module.exports = util;
