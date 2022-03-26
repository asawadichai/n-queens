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
C: n needs to be positive integer
Strategy:
  1. create an empty board by using the makeEmptyMatrix function with n number of rows and columns
  2. create a tree with the empty board
     create children with a space on every board's first line
  5. loop through all the spaces
       but skipping whenever the rows or columns match
  5.   add a second
  7. create children of first children
  8. assign valid spaces to 1st child
  9, loop through rest of the children and create valid spaces list


  3. create children of the empty board with rooks placed in every possible location without conflict
  5. if number of pieces is less than n, create more children for any validsolution children, recursively
  6. when pieces equals n stop creating more children
  7. Traverse the trees and select out all the boards that have pieces = n and are valid solutions and put in sol array
  8. for findNRooksSolution, return first board
  9. for countNRooksSolutions, return length of sol array
*/

// getSolution: traverse the solutionTree for complete solutions
//

window.spaceAddress = function(n) {
  var spaceAddressList = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      spaceAddressList.push([i, j]);
    }
  }
  return spaceAddressList;
};

// input: all spaces list, row/column of rook
window.reducePossibleAddress = function(allSpacesList, row, col) {

};

window.findNRooksSolution = function(n) {
  var matrix = makeEmptyMatrix(n);
  // var matrix = [
  //   [0, 0, 1, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0]
  // ];
  var solutionTree = new Tree(matrix, n);
  /* // create address of all spaces
  var allSpacesList = spaceAddress(n);
  // clone the empty matrix
  var firstSpaceMatrix = JSON.parse(JSON.stringify(matrix));
  // create first child matrix with piece at first space
  firstSpaceMatrix[0][0] = 1;
  // create first child tree
  var firstSpaceTree = new Tree(firstSpaceMatrix, n);
  // add first child tree to solutionTree
  solutionTree.children.push(firstSpaceTree);
  // delete first space from allspaceslist
  allSpacesList.shift();
  // loop through all spaces list
  for (var i = 0; i < allSpacesList.length; i++) {
    // for every space list, try to add to the matrix

    // if that new matrix results in conflict
    // add that space into the firstchildren list

    // if there is no conflict,

    // add that space to the valid spaces list (for first child tree)
  }

  // we would create new valid spaces list for the rest of the other first children

  // loop through all children, creating valid children using their valid spaces list
 */


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

  //return solutionTree;
  var solutionsSet = new Set();
  var grabAllSolution = function (board) {
    if (board.n === board.pieces) {
      var solBoard = JSON.stringify(board.board);
      solutionsSet.add(solBoard);
    }
    if (board.children.length > 0) {
      for (var i = 0; i < board.children.length; i++) {
        grabAllSolution(board.children[i]);
      }
    }
  };

  grabAllSolution(solutionTree);
  var allSolutionSet = Array.from(solutionsSet);
  var solution = JSON.parse(allSolutionSet[0]);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = function factoralize(n) {
    var result = n;
    if (n === 0 || n === 1) {
      return 1;
    }
    while (n > 1) {
      n--;
      result = result * n;
    }
    return result;
  };

  var solutionCount = solution(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  var matrix = makeEmptyMatrix(n);
  // var matrix = [
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0]
  // ];
  var solutionTree = new Tree(matrix, n);
  var findAllSolutions = function (tree) {
    tree.possibleSolutions('queen');
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

  var solutionsSet = new Set();
  var grabAllSolution = function (board) {
    if (board.n === board.pieces) {
      var solBoard = JSON.stringify(board.board);
      solutionsSet.add(solBoard);
    }
    if (board.children.length > 0) {
      for (var i = 0; i < board.children.length; i++) {
        grabAllSolution(board.children[i]);
      }
    }
  };

  while (solutionsSet.size === 0) {
    var secondChild = JSON.parse(JSON.stringify(matrix));
    secondChild[0][j] = 1;
    var secondChildTree = new Tree(secondChild, n);
    solutionTree.children.push(secondChildTree);
    findAllSolutions(solutionTree.children[j]);
  }


  grabAllSolution(solutionTree);
  var allSolutionSet = Array.from(solutionsSet);
  var solution = JSON.parse(allSolutionSet[0]);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var matrix = makeEmptyMatrix(n);
  var board = new Board(matrix);

  var generateSolutions = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        generateSolutions(row++);
      }
      board.togglePiece(row, col);
    }
  };
  generateSolutions(0);


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

//Psuedo:
// with a given board Tree
// iterate through each row and column
//   try to put a 1 in the current location. If there is already a 1, skip,
//   otherwise, create a duplicate of the parent board
//   and put a 1 in the location
//   create a new Board from the child board copy
//   check if there are any conflicts (Rooks or Queens)
//   if there are no conflicts, then push the board to the children array

// THIS ONE IS ORIGINAL THAT CREATES ALL SOLUTIONS BUT HAS TERRIBLE TIME COMPLEXITY
// window.Tree.prototype.possibleSolutions = function (rookOrQueen) {
//   for (var row = 0; row < this.n; row++) {
//     for (var col = 0; col < this.n; col++) {
//       if (this.board[row][col] === 0) {
//         var childBoard = JSON.parse(JSON.stringify(this.board));
//         childBoard[row][col] = 1;
//         var newChild = new Tree(childBoard, this.n);
//         var newChildBoard = new Board(childBoard);
//         if (rookOrQueen === 'rook' && !newChildBoard.hasAnyRooksConflicts()) {
//           this.children.push(newChild);
//         } else if (rookOrQueen === 'queen' && !newChildBoard.hasAnyQueensConflicts()) {
//           this.children.push(newChild);
//         }
//       }
//     }
//   }
// };

// THIS ONE ONLY DOES 1 SOLUTION AND MOVES ON
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
          return;
        } else if (rookOrQueen === 'queen' && !newChildBoard.hasAnyQueensConflicts()) {
          this.children.push(newChild);
          return;
        }
      }
    }
  }
};

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

//var test = findNQueensSolution(4);

// var myfunc = function () {
//   board.push([100]);
// };

// test.map(myfunc);