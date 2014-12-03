var util = require('./util.js');
var queue = require('./blockQueue.js');


var BoardController = function(rows, columns) {
    this.board = [[]];
    this.block;
    this.rows = rows;
    this.columns = columns;
    this.inPlay = false;
    this.deathRow = 2; // occupation of this row means game over

    this.init = function() {
        util.printBoard(this.board);
        var cols = this.columns + 2 // add two extra columns filled with 1 for simpler collision detection
        var rows = this.rows + 3;
        var board = new Array(rows);
        for (var i=0; i<board.length; i++) {
            board[i] = util.paddedArray(cols, 0);
            board[i][0] = 1;
            board[i][cols-1] = 1;
        }
        board.push(util.paddedArray(cols, 1));
        this.board = board;
        console.log('Newly created board');
        util.printBoard(this.board);
    };
        // push an extra filled row to act like a floor


    this.createBoard = function() {
    };

    this.getNewBlock = function() {
        this.block = queue.next();
        // pos it in the middle of the game board
        this.block.pos = {row: 0, col: 4};
        this.inPlay= true;
    }
    this.moveLeft = function() {
        var collision = this.detectCollision(this.block.pos.col - 1, this.block.pos.row, this.block.curState);
        if(!collision){
            this.block.pos.col--;
        }
    };

    this.moveRight = function() {
        var collision = this.detectCollision(this.block.pos.col + 1, this.block.pos.row, this.block.curState);
        if(!collision){
            this.block.pos.col++;
        }
    }

    this.moveDown = function() {
       var collision = this.detectCollision(this.block.pos.col, this.block.pos.row + 1, this.block.curState);
        if(!collision){
            this.block.pos.row++;
        }
    }

    this.rotate = function() {
        // try rotation
        var collision = this.detectCollision(this.block.pos.col, this.block.pos.row, this.block.peekState());
        if(!collision){
            this.block.rotateRight();
            return;
        } else {
            // rotation failed. This can happen if you are trying
            // to rotate at the right or left boundary, but you
            // should still be able to rotate there. To compensate
            // we will 'wall kick'

            right_collision = this.detectCollision(this.block.pos.col - 1, this.block.pos.row, this.block.peekState());
            left_collision = this.detectCollision(this.block.pos.col + 1, this.block.pos.row, this.block.peekState());
            if(!right_collision) {
                this.block.pos.col--;
                this.block.rotateRight();
            }
            else if (!left_collision) {
                this.block.pos.col++;
                this.block.rotateRight();
            }

        }
    }
    this.fallBlock = function() {
        var board_row = this.block.pos.row;
        var board_col = this.block.pos.col;

        var landed = this.detectLanded();

        if(!landed) {
            this.block.pos.row++;
        }
        else {
            // prepare to land
            this.setBlock();
        }
    }
    this.detectLanded = function() {
        var row = this.block.pos.row;
        var col = this.block.pos.col;
        var landed = false;

        for (var i = 0; i < this.block.curState.length; i++) {
            for (var j = 0; j < this.block.curState[i].length; j++) {
                if (this.block.curState[i][j] > 0) {
                    if(this.board[row + i + 1][col + j] > 0) {
                        //Our falling block is directly touching the
                        //a landed piece below it. That means it landed!
                        landed = true;
                        return landed;
                    }
                }
            }
        }

        return landed;
    }
    // Once a falling block reaches the rest of the resting peices,
    // this function will freeze it on the gameboard
    this.setBlock = function() {
        var row = this.block.pos.row;
        var col = this.block.pos.col;

        for (var i = 0; i < this.block.curState.length; i++) {
            for (var j = 0; j < this.block.curState[i].length; j++) {
                if (this.block.curState[i][j] > 0) {
                    this.board[row + i][col + j] = this.block.color;
                }
            }
        }
        this.inPlay = false;
        this.handleFilledLines();

    };
    this.detectLoss = function() {
        var sum = 0;
        var loss = false;

        for (var i = 0; i < this.board[0].length; i++) {
            if(this.board[this.deathRow][i] > 0) {
                sum += 1;
            }
            if(sum >= 3) {
                loss = true;
                break;
            }
        }

        return loss;
    };
    // remove lines from our board and inject fresh
    // new lines on top
    this.handleFilledLines = function() {
        var lines = this.detectFilledLines();
        console.log('removing lines');
        console.log(lines);

        for(var i = 0; i < lines.length; i++) {
            this.board.splice(lines[i], 1);
            new_row = util.paddedArray(this.columns + 2, 0);
            new_row[0] = 1;
            new_row[this.columns + 1] = 1;
            this.board.unshift(new_row);
        }
    };
    // returns lines that have been filled
    this.detectFilledLines = function() {
        var lines = [];
        for (var i = 0; i< this.board.length-1; i++) {
            if(this.isLineFilled(this.board[i])) {
                lines.push(i)
            }
        }
        return lines;
    };
    // all nonzero elements are seen as 1s
    this.isLineFilled = function(line) {
        var filled = false;
        var sum = 0;
        for (var i = 0; i< line.length; i++) {
            if(line[i] === 0) {
                return false
            }
            if(line[i] > 0) {
                sum += 1;
            }
        }
        if (sum === this.columns + 2) {
            filled = true;
        }
        return filled;
    }
    this.detectCollision = function(col, row, shapeArray) {
        var collision = false;
        for (var i=0; i < shapeArray.length; i++) {
            for(var j=0; j< shapeArray[i].length; j++) {
                if(shapeArray[i][j] > 0 && this.board[row + i][col + j] > 0) {
                    //overlapping zeroes on this move!!
                    collision = true;
                    return collision;
                }
            }
        }

        return collision;
    }
};// end of board controller

module.exports.BoardController = BoardController;
