import PuzzleMask from "./puzzleMask";
import paper from "paper";
import { Point } from "paper/dist/paper-core";

const createPieces = (boardConfig, pieceId) => {
  const { piecesPerColumn, piecesPerRow, pieceWidth, shapes } = boardConfig;

  const picecRatio = pieceWidth / 100;
  const pieces = [];
  const pieceIndexes = [];

  for (let y = 0; y < piecesPerColumn; y++) {
    for (let x = 0; x < piecesPerRow; x++) {
      const shape = shapes[y * piecesPerRow + x];
      const mask = PuzzleMask(
        picecRatio,
        shape.topTab,
        shape.rightTab,
        shape.bottomTab,
        shape.leftTab,
        pieceWidth
      );

      // 투명하면 클릭 불가
      mask.opacity = 0.25;
      mask.strokeColor = "black";
      mask.fillColor = new paper.Color(0, 0, 0, 0.01);

      const border = mask.clone();
      border.strokeColor = "black";
      border.strokeWidth = 2;

      const piece = new paper.Group([mask, border]);
      piece.shadowColor = new paper.Color("#666");
      piece.shadowBlur = 1;
      piece.shadowOffset = new Point(-1, -1);
      piece.position = new Point(50, 50);

      piece.clipped = true;
      piece.opacity = 1;

      piece.shape = shape;

      piece.data.id = pieceId ++;

      pieces.push(piece);
      pieceIndexes.push(pieces.length - 1);
    }
  }

  return { pieces, pieceIndexes };
};

export default createPieces;
