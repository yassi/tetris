var blocks = require("../blocks.js");

describe("single block", function(){
  beforeEach(function(){
    this.block = new blocks.Tetromino();
  });

  it("should have default color 2", function(){
    expect(this.block.color).toBe(2);
  });

  it("should start at first state", function(){
    expect(this.block.curState).toEqual([1]);
  });

  it("should start at position (0,4)", function() {
    expect(this.block.pos.row).toEqual(0);
    expect(this.block.pos.col).toEqual(4);
  });
});

describe("tetromino block", function() {
  beforeEach(function() {
    this.pieces = [
      new blocks.L(),
      new blocks.O(),
      new blocks.J(),
      new blocks.T(),
      new blocks.I(),
      new blocks.S(),
      new blocks.Z()
    ];
  });

  it("will be in the same state after 4 rotations", function() {
    for (var i = 0; i < this.pieces.length; i++) {
      var p = this.pieces[i];
      p.rotateRight();
      p.rotateRight();
      p.rotateRight();
      p.rotateRight();
      expect(p.curState).toEqual(p.states[0]);
    }
  });

  it("can be moved down, left, and right", function() {
    for (var i = 0; i < this.pieces.length; i++) {
      var p = this.pieces[i];
      p.moveDown();
      expect(p.pos.row).toEqual(1);
      p.moveRight();
      expect(p.pos.col).toEqual(5);
      p.moveLeft();
      expect(p.pos.col).toEqual(4);
    }
  });
});
