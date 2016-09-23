//goal num and swipe count based on difficulty

const Grid = function(gridSize, goalNum) {
  this.grid = generateGrid(gridSize, goalNum);
}

//generate grid function
function generateGrid(size, goalNum) {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let i2 = 0; i2 < size; i2++) {
      let randTileVal = randNum(randNum(goalNum));
      grid[i].push(new Tile(randTileVal, {row: i, col: i2}));
    }
  }
  return grid;
};

//generate rand #
function randNum(num) {
  return Math.floor(Math.random() * num) + 1;
};

export default Grid
