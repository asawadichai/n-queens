/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
/*
I: n which represents number of rowsxcolumns of chess board
O; nxn matrix chess board representing a valid solution for placed rooks that cannot attach each other
E:
C: n needs to be positive iteger
Strategy:
  1. create an empty board with n number of rows and columns (with helper function)
  2. pass the empty board into the Board function so it gets all the methods
  3. create a tree with the empty board
  4. create children of the empty board with rooks placed in every possible location
    a: while creating children, check for:
      aa: check for conflicts
      ab: set true/false for isValidSolution
      ac: check if number of rooks placed equals to n
    b: if there are conflicts, stop creating children
    c: if isValidSolution is false, and number of rooks is less than n, try to create more children
  5. once entire tree has been traversed, go into the tree and find all isValidSolution boards
  6. put solution board in an array
  7. remove duplicate solutions
  8. return first valid solution, and return n number of element in solutions array

Psuedo:
*/


window.findNRooksSolution = function(n) {
  var board = new Board(makeEmptyBoard(n));
  var pieces = 0;
  var solutionTree = new Tree(board, n, pieces);

  // function(board)
  // set a "1" starting from first row first column
  // iterate through n columns
  // once we reach n columns, iterate through next row
  // try to put a 1 in the current location. If there is already a 1, skip,
  // otherwise, put a 1 in the location, and push entire array to a children's array.
  // iterate through n columns
  // next row
  var childrensArray = [];
  var possibleSolutions = function (board) {
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        board.attributes[row][col];
      }
    }

  };
  // BC: isValidSolution === true, n === pieces, there is a conflict
  // RC: there are no conflicts, is valid solution === false, pieces < n


  var solution = board; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.makeEmptyBoard = function(n) {
  var matrix = Array(n).fill(Array(n).fill(0));
  return matrix;
};

window.Tree = function(inputBoard, n, pieces) {
  this.board = inputBoard;
  this.n = n;
  this.pieces = 0;
  this.isValidSolution = false;
  this.children = [];
};

window.Tree.prototype.addChild = function(matrix) {
  var newChild = window.Tree(matrix);
}

