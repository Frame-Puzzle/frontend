const fitPieces = (pieces, boardConfig) => {

  const { coordinates, piecesPerRow } = boardConfig;
  pieces.forEach((piece, index) => {
    const row = Math.floor(index / piecesPerRow);
    const col = index % piecesPerRow;

    piece.position.x = coordinates[row][col].x;
    piece.position.y = coordinates[row][col].y;
  });

};

export default fitPieces;
