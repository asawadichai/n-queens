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
  1. create an empty board by reusing the makeEmptyMatrix function with n number of rows and columns
  2. create a tree with the empty board
  3. create children of the empty board with rooks placed in every possible location without conflict
  5. if number of pieces is less than n, create more children for any validsolution children, recursively
  6. when pieces equals n stop creating more children
  7. Traverse the trees and select out all the boards that have pieces = n and are valid solutions and put in sol array
  8. for findNRooksSolution, return first board
  9. for countNRooksSolutions, return length of sol array

Psuedo:
// function(board)
// set a "1" starting from first row first column
// iterate through n columns
// once we reach n columns, iterate through next row
// try to put a 1 in the current location. If there is already a 1, skip,
// otherwise, put a 1 in the location, and push entire array to a children's array.
// iterate through n columns
// next row

*/

// getSolution: traverse the solutionTree for complete solutions
//

window.findNRooksSolution = function(n) {
  var matrix = makeEmptyMatrix(n);
  // var matrix = [
  //   [0, 0, 1, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0]
  // ];
  var solutionTree = new Tree(matrix, n);

  var findAllSolutions = function (tree) {
    tree.possibleSolutions('rook');
    if (tree.pieces === tree.n - 1) {
      return;
    } else {
      for (var i = 0; i < tree.children.length; i++) {
        if (tree.children[i].n !== this.pieces) {
          findAllSolutions(tree.children[i]);
        }
      }
    }
  };
  findAllSolutions(solutionTree);

  return solutionTree;
  // var solutionsSet = new Set();
  // var grabAllSolution = function (board) {
  //   if (board.n === board.pieces) {
  //     var solBoard = JSON.stringify(board.board);
  //     solutionsSet.add(solBoard);
  //   }
  //   if (board.children.length > 0) {
  //     for (var i = 0; i < board.children.length; i++) {
  //       grabAllSolution(board.children[i]);
  //     }
  //   }
  // };

  // grabAllSolution(solutionTree);
  // var allSolutionSet = Array.from(solutionsSet);
  // var solution = JSON.parse(allSolutionSet[0]);

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
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

window.Tree = function(inputBoard, n) {
  this.board = inputBoard;
  this.n = n;
  this.children = [];
  this.countPieces();
};

window.Tree.prototype.countPieces = function() {
  var pieces = _.reduce(this.board, function(memo, row) {
    return memo + _.reduce(row, function(memo, col) {
      return memo + col;
    }, 0);
  }, 0);
  this.pieces = pieces;
};

window.Tree.prototype.possibleSolutions = function (rookOrQueen) {
  for (var row = 0; row < this.n; row++) {
    for (var col = 0; col < this.n; col++) {
      if (this.board[row][col] === 0) {
        var childBoard = JSON.parse(JSON.stringify(this.board));
        childBoard[row][col] = 1;
        var newChild = new Tree(childBoard, this.n);
        var newChildBoard = new Board(childBoard);
        if (rookOrQueen === 'rook' && !newChildBoard.hasAnyRooksConflicts()) {
          this.children.push(newChild);
        } else if (rookOrQueen === 'queen' && !newChildBoard.hasAnyQueensConflicts()) {
          this.children.push(newChild);
        }
      }
    }
  }
};

// window.Tree.prototype.map = function (mapFunc) {
//   mapFunc(this);
//   if (this.children.length > 0) {
//     this.children.forEach(function(child) {
//       child.map(mapFunc);
//     });
//   }
// };

window.makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

//var test = makeEmptyMatrix(4);
// var test = [
//   [0, 0, 1, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0]
// ];
// var testTree = new Tree(test, 4);
// testTree.possibleSolutions();

var test = findNRooksSolution(4);

// var myfunc = function () {
//   board.push([100]);
// };

// test.map(myfunc);