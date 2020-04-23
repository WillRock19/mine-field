import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  playerWonGame,
  showAllMines,
} from './boardManagerService';

describe('BoardManagerService', () => {
  const createBoardForTests = (rows, columns) => {
    return Array(rows)
      .fill(0)
      .map(row => {
        return Array(columns)
          .fill(0)
          .map((_, column) => {
            return {
              column,
              row,
              hasFlag: column % 2,
              isMined: !column % 2,
              opened: column % 2,
              exploded: !column % 2,
              nearMines: Math.floor(Math.random()),
            };
          });
      });
  };

  describe('Function createMinedBoard', () => {
    const defaultColumns = 10;
    const defaultRows = 8;
    const defaultMines = 0;

    it('should return a board with the specified number of rows', () => {
      const board = createMinedBoard(defaultRows, defaultColumns, defaultMines);
      expect(board).toHaveLength(defaultRows);
    });

    it('should return a board with the specified number of columns', () => {
      const board = createMinedBoard(defaultRows, defaultColumns, defaultMines);
      expect(board[0]).toHaveLength(defaultColumns);
    });

    it('should return a board with the specified amount of mines', () => {
      const desiredAmountOfMines = 5;
      const board = createMinedBoard(
        defaultRows,
        defaultColumns,
        desiredAmountOfMines,
      );

      const columnsWithMinesPerRow = board.map(row => {
        const columnsMined = row.filter(column => {
          return column.isMined === true;
        });
        return columnsMined.length;
      });

      const numberOfMines = columnsWithMinesPerRow.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      );
      expect(numberOfMines).toBe(desiredAmountOfMines);
    });
  });

  describe('Function cloneBoard', () => {
    it('should return new instance of the board with exact same configurations', () => {
      const defaultBoard = createBoardForTests(10, 8);
      const clonedBoard = cloneBoard(defaultBoard);

      expect(clonedBoard).toEqual(defaultBoard);
    });
  });

  describe('Function openField', () => {
    it('should not change field if it is already opened', () => {
      const rowToOpen = 2;
      const columnToOpen = 3;
      const defaultBoard = createBoardForTests(5, 5);
      defaultBoard[rowToOpen][columnToOpen].opened = true;

      openField(defaultBoard, rowToOpen, columnToOpen);
      expect(defaultBoard[rowToOpen][columnToOpen].opened).toBe(true);
    });

    it('should make field explode if it is mined', () => {
      const rowToOpen = 2;
      const columnToOpen = 3;
      const defaultBoard = createBoardForTests(5, 6);

      defaultBoard[rowToOpen][columnToOpen].opened = false;
      defaultBoard[rowToOpen][columnToOpen].exploded = false;
      defaultBoard[rowToOpen][columnToOpen].isMined = true;

      openField(defaultBoard, rowToOpen, columnToOpen);
      expect(defaultBoard[rowToOpen][columnToOpen].exploded).toBe(true);
    });
  });

  describe('Function hadExplosion', () => {
    const createBoardWithoutExplosions = (rows, columns) => {
      let defaultBoard = createBoardForTests(rows, columns);
      defaultBoard.forEach(row => {
        row.forEach(column => {
          column.exploded = false;
        });
      });
      return defaultBoard;
    };

    it('should return false if none of the fields in board had an explosion', () => {
      const board = createBoardWithoutExplosions(2, 2);
      expect(hadExplosion(board)).toBeFalsy();
    });

    it('should return true if at least one of the fields in board has exploded', () => {
      const board = createBoardWithoutExplosions(2, 2);
      board[1][1].exploded = true;
      expect(hadExplosion(board)).toBeTruthy();
    });
  });

  describe('Function playerWonGame', () => {
    it('should return false if there is an unoppened field without a flag and with a mine', () => {
      const board = createBoardForTests(1, 1);
      board.forEach(row => {
        row.forEach(column => {
          column.opened = true;
          column.isMined = false;
          column.hasFlag = false;
        });
      });

      board[0][0].opened = true;
      board[0][0].isMined = true;

      expect(playerWonGame(board)).toBeFalsy();
    });

    it('should return false if there is an opened field without a flag and with a mine', () => {
      const board = createBoardForTests(3, 4);
      board.forEach(row => {
        row.forEach(column => {
          column.opened = false;
          column.isMined = true;
          column.hasFlag = false;
        });
      });

      board[1][2].opened = true;
      expect(playerWonGame(board)).toBeFalsy();
    });

    it('should return false if there is a mined field without a flag on it, despite it is opened or not', () => {
      const board = createBoardForTests(3, 4);
      board.forEach(row => {
        row.forEach(column => {
          column.hasFlag = true;
          column.isMined = true;
        });
      });

      board[1][2].hasFlag = false;
      expect(playerWonGame(board)).toBeFalsy();
    });

    it('should return true if all mined fields have flags on it', () => {
      const board = createBoardForTests(3, 4);
      board.forEach(row => {
        row.forEach(column => {
          column.hasFlag = true;
          column.isMined = true;
        });
      });
      expect(playerWonGame(board)).toBeTruthy();
    });

    it('should return true if there are no mined fields without flags and all openned fields are not mined', () => {
      const board = createBoardForTests(3, 4);
      board.forEach(row => {
        row.forEach(column => {
          column.opened = true;
          column.isMined = false;
        });
      });

      board[1][2].isMined = true;
      board[1][2].hasFlag = true;
      board[1][2].opened = false;

      expect(playerWonGame(board)).toBeTruthy();
    });
  });
});
