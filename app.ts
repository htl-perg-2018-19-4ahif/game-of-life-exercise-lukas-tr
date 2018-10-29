window.onload = () => {
  const boardSize = 200;
  const boardScale = 4;
  const initialAlive = 0.03;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = canvas.height = boardSize * boardScale;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "black";

  const createGunBoard = (boardSize: number) => {
    const board = createBoard(boardSize, 0);
    board[2][6] = true;
    board[2][7] = true;
    board[3][6] = true;
    board[3][7] = true;

    board[12][6] = true;
    board[12][7] = true;
    board[12][8] = true;
    board[13][5] = true;
    board[13][9] = true;
    board[14][4] = true;
    board[14][10] = true;
    board[15][4] = true;
    board[15][10] = true;
    board[16][7] = true;
    board[17][5] = true;
    board[17][9] = true;
    board[18][6] = true;
    board[18][7] = true;
    board[18][8] = true;
    board[19][7] = true;

    board[22][4] = true;
    board[22][5] = true;
    board[22][6] = true;
    board[23][4] = true;
    board[23][5] = true;
    board[23][6] = true;
    board[24][3] = true;
    board[24][7] = true;
    board[26][2] = true;
    board[26][3] = true;
    board[26][7] = true;
    board[26][8] = true;

    board[36][4] = true;
    board[36][5] = true;
    board[37][4] = true;
    board[37][5] = true;
    return board;
  };

  const createBoard = (boardSize: number, initialAlive: number) =>
    new Array(boardSize)
      .fill(undefined)
      .map(() =>
        new Array(boardSize)
          .fill(undefined)
          .map(() => Math.random() < initialAlive)
      );

  const getNumberOfNeighbors = (x: number, y: number) =>
    [x - 1, x, x + 1]
      .map(i =>
        [y - 1, y, y + 1]
          .map(
            j =>
              (!(i == x && j == y) && board[i] && board[i][j] ? 1 : 0) as number
          )
          .reduce((prev, cur) => prev + cur)
      )
      .reduce((prev, cur) => prev + cur);

  let board = createBoard(boardSize, initialAlive);

  const lifecycle = () => {
    board = board.map((row, x) =>
      row.map((alive, y) => {
        const curNeighbors = getNumberOfNeighbors(x, y);
        return curNeighbors == 3 || (alive && curNeighbors == 2);
      })
    );
  };

  const draw = () => {
    ctx.clearRect(0, 0, boardSize * boardScale, boardSize * boardScale);
    board.forEach((row, x) => {
      row.forEach(
        (alive, y) =>
          alive &&
          ctx.fillRect(x * boardScale, y * boardScale, boardScale, boardScale)
      );
    });

    requestAnimationFrame(draw);
  };
  setInterval(lifecycle, 100);

  requestAnimationFrame(draw);

  (document.querySelector(
    "#restart-btn"
  ) as HTMLButtonElement).onclick = () => {
    board = createBoard(boardSize, initialAlive);
  };
  (document.querySelector("#gun-btn") as HTMLButtonElement).onclick = () => {
    board = createGunBoard(boardSize);
  };
};
