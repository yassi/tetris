'use strict';

var util = {}

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
util.requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


util.printBoard = function(arr) {
    var str = '';
    for (var i = 0; i< arr.length; i++) {
        if(i !== 0) {
            str += '\n';
        }
        for (var j = 0 ; j< arr[i].length; j++) {
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

util.lineOccupied = function(arr) {
    // for (var i = 0; i< )
}

util.arraySum = function(arr, start, end) {
    arr.slice(start, end)
    .reduce(function(prev, curr, index, array){
        return prev + curr;
    });
};

util.arrayShuffle = function(arr){ //v1.0
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
};

util.arrayRepeat = function(arr, n) {
    var a = [];
    for(var i = 0; i < n; i++) {
        a = a.concat(arr);
    }
    return a;
};

module.exports = util;
