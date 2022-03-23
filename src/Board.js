// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // I: row index of our chess board (based on zero index)
    // O: boolean whether there is a conflict for the particular row index
    // false - no row conflict
    // true - row conflict exists
    // E: no chess piece on that row
    // C: only number 0 to n of rows in chess board
    // Strategy: if there are only 1 rook then no row conflict,
    // if there are 2 rooks then there is a conflict
    //
    // Psuedo:
    // board.get(rowIndex) returns entire row of chess board
    // board.set(rowIndex, [0, 0, 1, 0]) sets the row, takes new row as second input
    hasRowConflictAt: function(rowIndex) {
      // create a count variable starting from zero
      var count = 0;
      // get the row
      var currentRow = this.get(rowIndex);
      // loop through the row
      for (var i = 0; i < currentRow.length; i++) {
        // if there is a 1 in the row
        if (currentRow[i] === 1) {
          // increment count
          count++;
        }
      }
      // if we see 2 or more 1s in the row
      if (count > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts

    // create boolean rowConflict = false
    // start a n = 0 run hasRowConflictAt(0) until n = n
    hasAnyRowConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // need to get every row at index (colIndex)
    /*
    create a count = 0
    loop over the n board
      get the row at every n
      look at the element at the colIndex
       if column index equals 1
        increment count
    if count is greater than 1
      return true
    else return false
    */
    hasColConflictAt: function(colIndex) {
      var count = 0;
      for (var i = 0; i < this.attributes.n; i++) {
        var currentRow = this.get(i);
        if (currentRow[colIndex]) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict


    // info: majorDiagonalColumnIndexAtFirstRow might give use negative colIndex

    /*
    step 1: we get a majorDiaColIndexAtFirstRow, assign it as the first column value
    step 2: start a loop with starting at row 0 through n-1
    step 3: get the current row values
      check if column is greater than or equal to 0
      check if column is less than n
    step 4: if both check above are true,
      check the value at the current row and column
        if there is a 1, increment count
    step 6: if there are more than 1 '1s', return true, else return false
    */
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var column = majorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      for (var row = 0; row < this.attributes.n; row++) {
        var currentRow = this.get(row);
        if (column >= 0 && column < this.attributes.n) {
          var locVal = currentRow[column];
          if (locVal) {
            count++;
          }
        }
        column++;
      }
      if (count > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    //_getFirstRowColumnIndexForMajorDiagonalOn()
    /*
    step 1: get the starting column value = -(n-2)
    step 2: loop through each column from start to n-2
      pass into hasMajorDiagonalConflictAt
      if true, return true
      else return false
    */
    hasAnyMajorDiagonalConflicts: function() {
      var column = -(this.attributes.n - 2);
      var bound = this.attributes.n - 2;
      for (;column <= bound; column++) {
        if (this.hasMajorDiagonalConflictAt(column)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var column = minorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      for (var row = 0; row < this.attributes.n; row++) {
        var currentRow = this.get(row);
        if (column >= 0 && column < this.attributes.n) {
          var locVal = currentRow[column];
          if (locVal) {
            count++;
          }
        }
        column--;
      }
      if (count > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var column = (2 * this.attributes.n) - 3;
      var bound = 0;
      for (;column >= bound; column--) {
        if (this.hasMinorDiagonalConflictAt(column)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
