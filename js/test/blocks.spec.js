var blocks = require("../blocks.js");

describe("block", function(){

  beforeEach(function(){
    this.block = new blocks.Tetromino();
  });

  it("should have default color 2", function(){
    expect(this.block.color).toBe(2);
  });

  it("should start at first state", function(){
    expect(this.block.curState).toEqual([1]);
  });

});
