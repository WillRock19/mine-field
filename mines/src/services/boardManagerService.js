const createBoard = (rows, columns) => {
  return Array(rows)
    .fill(0)
    .map(row => {
      return Array(columns)
        .fill(0)
        .map((_, column) => {
          return {
            column,
            row: row,
            hasFlag: false,
            isMined: false,
            opened: false,
            exploded: false,
            nearMines: 0,
          };
        });
    });
};

const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;

  while (minesPlanted <= minesAmount) {
    const randomSelectedRow = parseInt(Math.random() * rows, 10);
    const randomSelectedColumn = parseInt(Math.random() * columns, 10);

    if (!board[randomSelectedRow][randomSelectedColumn].isMined) {
      board[randomSelectedRow][randomSelectedColumn].isMined = true;
      minesPlanted++;
    }
  }
};

const createMinedBoard = (rows, column, minesAmount) => {
  const board = createBoard(rows, column);
  spreadMines(board, minesAmount);

  return board;
};

const cloneBoard = board => {
  return board.map(rows => {
    return rows.map(field => {
      return {...field};
    });
  });
};

const getNeighbors = (board, rowToLook, columnToLook) => {
  const validNeighbors = [];
  const allNeighborsRows = [rowToLook - 1, rowToLook, rowToLook + 1];
  const allNeighborsColumns = [
    columnToLook - 1,
    columnToLook,
    columnToLook + 1,
  ];

  allNeighborsRows.forEach(row => {
    allNeighborsColumns.forEach(column => {
      const isNotInitialCellToLook =
        row !== rowToLook && column !== columnToLook;

      const rowIsValid = row >= 0 && row < board.length;
      const columnIsValid = column >= 0 && column < board[0].length;

      if (isNotInitialCellToLook && rowIsValid && columnIsValid)
        validNeighbors.push(board[row][column]);
    });
  });
  return validNeighbors;
};

const safeNeighborhood = (board, rowToLook, columnToLook) => {
  const isSafeFunction = (result, neighbor) => result && !neighbor.isMined;
  const neighbors = getNeighbors(board, rowToLook, columnToLook);

  return neighbors.reduce(isSafeFunction, true);
};

const openField = (board, rowToLook, columnToLook) => {
  const selectedField = board[rowToLook][columnToLook];

  if (!selectedField.opened) {
    selectedField.opened = true;

    if (selectedField.isMined) {
      selectedField.exploded = true;
    } else if (safeNeighborhood(board, rowToLook, columnToLook)) {
      getNeighbors(board, rowToLook, columnToLook).forEach(neighbor =>
        openField(board, neighbor.row, neighbor.column),
      );
    } else {
      const neighbors = getNeighbors(board, rowToLook, columnToLook);
      selectedField.nearMines = neighbors.filter(
        neightbor => neightbor.mined,
      ).length;
    }
  }
};

const fieldsFromBoard = board => [].concat(...board);

const hadExplosion = board =>
  fieldsFromBoard(board).filter(field => field.exploded).length > 0;

const fieldIsPendding = field => {
  (field.isMined && !field.hasFlag) || (!field.isMined && !field.opened);
};

const playerWonGame = board =>
  fieldsFromBoard(board).filter(fieldIsPendding).length === 0;

const showAllMines = board =>
  fieldsFromBoard(board)
    .filter(field => field.isMined)
    .forEach(field => field.opened === true);

export {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  playerWonGame,
  showAllMines,
};
