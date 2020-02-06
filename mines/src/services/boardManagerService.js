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
            flagged: false,
            mined: false,
            opened: false,
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

    if (!board[randomSelectedRow][randomSelectedColumn].mined) {
      board[randomSelectedRow][randomSelectedColumn].mined = true;
      minesPlanted++;
    }
  }
};

const createMinedBoard = (rows, column, minesAmount) => {
  const board = createBoard(rows, column);
  spreadMines(board, minesAmount);

  return board;
};

export {createMinedBoard};
