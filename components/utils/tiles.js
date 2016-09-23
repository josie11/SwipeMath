'use strict';

const operators = {
  '+': function(num1, num2) { return num1 + num2; },
  '-': function(num1, num2) { return num1 - num2; },
  '/': function(num1, num2) { return num1 / num2; },
  '*': function(num1, num2) { return num1 * num2; }
};

//constructor function: takes random value, position in grid.
  //pos = { x: #, y: #}
// has: swipe count, style??, operators used, merged data object: stores previous tiles
  //when merge, take operators used and values and merge with tiles operator used object.
  //operator used: { '+' : value } -->when adding new operator, increment value or add new prop and value
function Tile(value, pos) {
  this.value = value;
  this.pos = pos;
  this.swipeCount = 0;
  //accumulates points for merged tiles with swipecounts
  this.swipeHistoryValue = 0;
  this.operatorHistory = {};
  this.previousTiles = [];
}

//prototype method: total operator history value function
Tile.prototype.totalOperatorValue = function(otherOpHistory) {
  for (let operator in otherOpHistory) {
    if (otherOpHistory.hasOwnProperty(operator)) {
      let operatorScore = otherOpHistory[operator];
      operatorHistory(this, operator, operatorScore);
    }
  }
};

//prototype: merge(tile): adds to previous tiles
Tile.prototype.mergeTile = function(tile) {
  this.pos = tile.pos;
  this.previousTiles.unshift(tile);
  this.totalOperatorValue(tile.operatorHistory);
  this.swipeHistoryValue += tile.swipeHistoryValue + tile.swipeCount;
  this.swipeCount += 1;
};

//prototype method: changes value(operator)
//this is the number swiped into (not the number that is swiping)
Tile.prototype.changeTileValue = function(num, operator) {
  this.value = operators[operator](this.value, num);
};

//prototype: adds to operator history
//takes obj: {value}
Tile.prototype.addOperatorHistory = function(operator, value) {
  operatorHistory(this, operator, value);
};

//prototype: reset tile--> when tile exceeds swipe count
  //reset swipe count, reset operator history, reset previous tiles
Tile.prototype.resetTile = function(tile) {
  tile = new Tile(tile.pos, tile.value);
};

function operatorHistory(tile, operator, value) {
  if (tile.operatorHistory[operator]) {
    tile.operatorHistory[operator] += value;
  } else {
    tile.operatorHistory[operator] = value;
  }
}
