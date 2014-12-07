'use strict';

var util = require('./util.js');
var blocks = require('./blocks.js');

var BlockQueue = {};

BlockQueue.q = [];

BlockQueue.generateBlocks = function() {
  var all_blocks = [new blocks.J(),
    new blocks.L(),
    new blocks.O(),
    new blocks.I(),
    new blocks.T(),
    new blocks.S(),
    new blocks.Z(),
  ];

  // shuffled list of 28 blocks where each block is appears
  // 4 times
  this.q = util.arrayShuffle(util.arrayRepeat(all_blocks, 4));
};

BlockQueue.next = function() {
  if (this.q.length === 0) {
    this.generateBlocks();
  }
  return this.q.shift(1);
};

module.exports = BlockQueue;
