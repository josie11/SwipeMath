'use strict'

//constructor function: takes random value, position in grid.
  //pos = { x: #, y: #}
// has: swipe count, style??, operators used, merged data object: stores previous tiles
  //when merge, take operators used and values and merge with tiles operator used object.
  //operator used: { '+' : value } -->when adding new operator, increment value or add new prop and value
const operators = {
  '+': function(num1, num2) { return num1 + num2; },
  '-': function(num1, num2) { return num1 - num2; },
  '/': function(num1, num2) { return num1 / num2; },
  '*': function(num1, num2) { return num1 * num2; }
};

function Tile(pos, value) {
  this.value = value;
  this.pos = pos;
  this.swipeCount = 0;
  this.swipeHistoryValue = 0;
  this.operatorHistory = {};
  this.previousTiles = [];
}

//prototype method: total operator history value function
Tile.prototype.totalOperatorValue = function(operatorHistory) {
  for (let operator in operatorHistory) {
    if (operatorHistory.hasOwnProperty(operator)) {
      let operatorScore = operatorHistory[operator];
      if (this.operatorHistory[operator]) {
        this.operatorHistory[operator] += operatorScore;
      } else {
        this.operatorHistory[operator] = operatorScore;
      }
    }
  }
};

//prototype: merge(tile): adds to previous tiles
Tile.prototype.mergeTile = function(tile) {
  this.previousTiles.unshift(tile);
  this.totalOperatorValue(tile.operatorHistory);
  this.swipeHistoryValue += tile.swipeHistoryValue;
  this.swipeCount += 1;
};

//prototype method: changes value(operator)
//this is the number swiped into (not the number that is swiping)
Tile.prototype.changeTileValue = function(num, operator) {
  this.value = operators(this.value, num);
};

//prototype method: changes pos of tile(swipeDirection)
//something passes a function to this that will change the values of {}[x], {}[y]
Tile.prototype.changePos = function(changeFunc) {
  this.pos = changeFunc(this.pos);
};

//method that increments pos based on swipe direction, called by change pos prototype method

//prototype: adds to operator history

//prototype: reset tile--> when tile exceeds swipe count
  //reset swipe count, reset operator history, reset previous tiles

