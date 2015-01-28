'use strict';

var util = require('./util.js');
var board = require('./board.js');
var input = require('./input.js');

var Tetris = function(fps, canvas) {
  this.fps = fps || 60;
  this.running = false;
  this.runId = null;
  this.gameBoard = new board(20, 16);
  this.gameBoard.init();
  this.blockInPlay = false;

  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.block_size = 28; // in pixels
  this.block_gutter = 1; // space between blocks

  // Measured in ms
  this.startFrameTime = null;
  this.lastFrameTime = null;
  this.stepAccumulator = 0;
  this.step = 1000;

  this.init = function() {
    this.canvas.width = 700;
    this.canvas.height = 800;
  };

  this.startGameLoop = function() {
    if (this.runId === null) {
      this.running = true;
      this.startFrameTime = util.timestamp();
      this.prevFrameTime = this.startFrameTime;
      this.run();
    }
  };

  this.stop = function() {
    this.runId = window.cancelAnimationFrame(this.runId);
    this.runId = null;
    this.running = false;
  };

  this.reset = function() {
    this.stop();
    // other logic here
    this.startGameLoop();
  };

  this.run = function() {
    this.startFrameTime = util.timestamp();
    var delta = this.startFrameTime - this.prevFrameTime;

    this.update(delta);
    this.render(this.ctx);
    this.prevFrameTime = this.startFrameTime;

    if (this.running) {
      this.runId = util.requestAnimationFrame.call(window, this.run.bind(this));
    }
  };

  this.update = function(dt) {
    // time since beginning
    this.stepAccumulator += dt;

    var action;
    if (!this.gameBoard.inPlay) {
      this.gameBoard.getNewBlock();
    }

    while (input.actions.length > 0) {
      action = input.actions.pop();
      switch (action) {
        case 'left':
          this.gameBoard.moveLeft();
          break;
        case 'right':
          this.gameBoard.moveRight();
          break;
        case 'down':
          this.gameBoard.moveDown();
          break;
        case 'up':
          this.gameBoard.rotate();
          break;
        default:
          break;
      }
    }

    var step = 50 * (11 - this.gameBoard.level);
    if (this.stepAccumulator >= step) {
      this.gameBoard.fallBlock();
      this.stepAccumulator -= step;
    }

    var loss = this.gameBoard.detectLoss();
    if (loss) {
      console.log('PLAYER LOST');
      this.stop();
    }
  };

  this.render = function(ctx) {
    this.drawLanded(ctx);
    this.drawFallingBlock(ctx);
    this.drawLinesCleared(ctx);
    this.drawLevel(ctx);
    // this.drawThreshold(ctx);
  };

  this.drawLevel = function(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(550, 50, 200, 50);
    ctx.fillStyle = 'black';
    ctx.font="30px Verdana";
    ctx.fillText('Level: ' + this.gameBoard.level, 550, 85);
  };

  this.drawLinesCleared = function(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(550, 25, 200, 50);
    ctx.fillStyle = 'black';
    ctx.font="30px Verdana";
    ctx.fillText('Lines: ' + this.gameBoard.linesCleared, 550, 50);
  };

  this.drawThreshold = function(ctx) {
    var thresh = this.gameBoard.deathRow;
    var x_pos = 0;
    var y_pos = (thresh + 1) * 31.5;
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x_pos, y_pos);
    ctx.lineTo(x_pos + 600, y_pos);
    ctx.stroke();
  };

  this.drawLanded = function(ctx) {
    var x_pos = 0;
    var y_pos = 0;
    var pixel_offset = 2;

    for (var i = 0; i < this.gameBoard.board.length; i++) {
      if (i !== 0) {
        y_pos += this.block_size + this.block_gutter;
      }
      x_pos = 0;
      for (var j = 0; j < this.gameBoard.board[i].length; j++) {
        ctx.fillStyle = util.colors[this.gameBoard.board[i][j]];
        ctx.fillRect(x_pos, y_pos, this.block_size, this.block_size);
        x_pos += this.block_size + this.block_gutter;
      }
    }
  };

  this.drawFallingBlock = function(ctx) {
    var row = this.gameBoard.block.pos.row;
    var col = this.gameBoard.block.pos.col;

    for (var i = 0; i < this.gameBoard.block.curState.length; i++) {
      for (var j = 0; j < this.gameBoard.block.curState[i].length; j++) {

        if (this.gameBoard.block.curState[i][j] > 0) {
          ctx.fillStyle = util.colors[this.gameBoard.block.color];
          ctx.fillRect((j + col) * (this.block_size + this.block_gutter), (i + row) * (this.block_size + this.block_gutter), this.block_size, this.block_size);
        }
      }
    }
  };

}; // End of tetris function

window.Tetris = Tetris;
module.exports.Tetris = Tetris;
