import puzzleMask from "../puzzleBoard/puzzleMask";
import paper from "paper";
import { Point } from "paper/dist/paper-core";

const createPieces = (boardConfig) => {
  const { piecesPerColumn, piecesPerRow, pieceWidth, shapes } = boardConfig;

  const picecRatio = pieceWidth / 100;
  const pieces = [];

  for (let y = 0; y < piecesPerColumn; y++) {
    for (let x = 0; x < piecesPerRow; x++) {
      const shape = shapes[y * piecesPerRow + x];
      const mask = puzzleMask(
        picecRatio,
        shape.topTab,
        shape.rightTab,
        shape.bottomTab,
        shape.leftTab,
        pieceWidth
      );

      // 투명하면 클릭 불가
      mask.opacity = 0.25;

      mask.fillColor = new paper.Color(0, 0, 0, 0.01);
      mask.strokeColor = new paper.Color("black");

      const border = mask.clone();
      border.strokeColor = mask.strokeColor;
      border.strokeWidth = 2;

      const piece = new paper.Group([mask, border]);
      piece.shadowColor = new paper.Color("#666");
      piece.shadowBlur = 1;
      piece.shadowOffset = new Point(-1, -1);
      piece.position = new Point(50, 50);

      piece.clipped = true;
      piece.opacity = 1;

      piece.shape = shape;

      pieces.push(piece);
    }
  }

  return { pieces };
};

export default createPieces;
