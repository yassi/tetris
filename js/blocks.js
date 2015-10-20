var Tetromino = function() {
  this.color = 2; // green;
  this.states = [[1]];
  this.curState = this.states[0];

  //pos of top left block in this shape
  this.pos = {row: 0, col: 4};
};

Tetromino.prototype = {
  peekState: function() {
    var idx = this.states.indexOf(this.curState);
    if (idx < this.states.length - 1) {
      idx++;
    } else {
      idx = 0;
    }
    return this.states[idx];
  },
  rotateRight: function() {
    var idx = this.states.indexOf(this.curState);
    if (idx === this.states.length - 1) {
      // go back to the starting curState
      this.curState = this.states[0];
    } else {
      this.curState = this.states[idx + 1];
    }

  },
  rotateLeft: function() {
    var idx = this.states.indexOf(this.curState);
    if (idx === 0) {
      // go back to the starting curState
      this.curState = this.states[this.states.length - 1];
    } else {
      this.curState = this.states[idx - 1];
    }
  },

  moveLeft: function() {
    this.pos.col--;
  },
  moveRight: function() {
    this.pos.col++;
  },
  moveDown: function() {
    this.pos.row++;
  },
  fall: function() {},
  drop: function() {},

};

var LBlock = function() {
  this.pos = {row: 0, col: 4};
  this.color = 2;
  this.states = [
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
    ]
  ];
  this.curState = this.states[0];
};
LBlock.prototype = Tetromino.prototype;

var OBlock = function() {
  this.pos = {row: 0, col: 4};
  this.color = 3;
  this.states = [
    [
      [1, 1],
      [1, 1],
    ]
  ];
  this.curState = this.states[0];
};
OBlock.prototype = Tetromino.prototype;

var JBlock = function() {
  this.pos = {row: 0, col: 4};
  this.color = 4;
  this.states = [
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    [
      [1, 1, 1],
      [0, 0, 1],
    ]
  ];
  this.curState = this.states[0];
};
JBlock.prototype = Tetromino.prototype;

var TBlock = function() {
  this.pos = {row: 0, col: 4};
  this.color = 5;
  this.states = [
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [0, 1],
    ]
  ];
  this.curState = this.states[0];
};
TBlock.prototype = Tetromino.prototype;

var IBlock = function() {
  this.pos = {row: 0, col: 4};
  this.color = 6;
  this.states = [
    [
      [1],
      [1],
      [1],
      [1]
    ],
    [
      [1, 1, 1, 1],
    ]
  ];
  this.curState = this.states[0];
};
IBlock.prototype = Tetromino.prototype;

var SBlock = function() {
  this.pos = {row: 0, col: 4};
  this.color = 7;
  this.states = [
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ]
  ];
  this.curState = this.states[0];
};
SBlock.prototype = Tetromino.prototype;

var ZBlock = function() {
  this.pos = {row: 0, col: 4};
  this.color = 8;
  this.states = [
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ]
  ];
  this.curState = this.states[0];
};
ZBlock.prototype = Tetromino.prototype;

// constructors for all these blocks
module.exports = {
  Tetromino: Tetromino,
  L: LBlock,
  O: OBlock,
  J: JBlock,
  T: TBlock,
  I: IBlock,
  S: SBlock,
  Z: ZBlock
};
