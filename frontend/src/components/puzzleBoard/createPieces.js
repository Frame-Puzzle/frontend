import PuzzleMask from "./puzzleMask";
import paper from "paper";
import { Point } from "paper/dist/paper-core";

const createPieces = (boardConfig, pieceId, pieceData) => {
  const { piecesPerColumn, piecesPerRow, pieceWidth, shapes } = boardConfig;

  const picecRatio = pieceWidth / 100;
  const pieces = [];
  const pieceIndexes = [];

  let count = 0;
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
      mask.opacity = 1;
      const authority = pieceData[count].authority;
      switch (authority) {
        case 1:
          // 비어있는 상태
          mask.fillColor = new paper.Color(0, 0, 0, 0.01);
          break;
        case 2:

          // 본인 수정 가능
          mask.fillColor = "#C3C7F4";

          break;
        case 3:
          // 탈퇴 하여 수정 가능
          mask.fillColor = "#F3E7FB";

          break;
        case 4:
          // 수정 불가
          mask.fillColor = "#F1BDEC";
          
          break;
      }
      mask.strokeColor = "#B0B0B0"

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

      piece.data.id = pieceId + count++;

      pieces.push(piece);
      pieceIndexes.push(pieces.length - 1);
    }
  }

  return { pieces, pieceIndexes };
};

export default createPieces;
