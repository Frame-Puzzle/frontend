const autoSnapPieces = (pieces, boardConfig) => {
  const { pieceWidth, piecesPerRow } = boardConfig;

  pieces.forEach((piece, index) => {
    const x = index % piecesPerRow;
    const y = Math.floor(index / piecesPerRow);
    const shape = piece.shape;

    // 인접 타일과의 맞물림 체크 및 위치 조정
    if (x > 0) {
      const leftpiece = pieces[index - 1];
      if (leftpiece.shape.rightTab + shape.leftTab === 0) {
        piece.position.x = leftpiece.position.x + pieceWidth;
      }
    }
    if (y > 0) {
      const toppiece = pieces[index - piecesPerRow];
      if (toppiece.shape.bottomTab + shape.topTab === 0) {
        piece.position.y = toppiece.position.y + pieceWidth;
      }
    }
    console.log(x, y);
    console.log("x:", piece.position.x, "y:", piece.position.y);
  });
};

export default autoSnapPieces;