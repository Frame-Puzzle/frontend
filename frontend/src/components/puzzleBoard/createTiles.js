import PuzzleMask from "./puzzleMask";
import paper from "paper";
import { Point } from "paper/dist/paper-core";

const createTiles = (boardConfig, tileId) => {
  const { tilesPerColumn, tilesPerRow, tileWidth, shapes } = boardConfig;

  const tileRatio = tileWidth / 100;
  const tiles = [];
  const tileIndexes = [];

  for (let y = 0; y < tilesPerColumn; y++) {
    for (let x = 0; x < tilesPerRow; x++) {
      const shape = shapes[y * tilesPerRow + x];
      const mask = PuzzleMask(
        tileRatio,
        shape.topTab,
        shape.rightTab,
        shape.bottomTab,
        shape.leftTab,
        tileWidth
      );

      // 투명하면 클릭 불가
      mask.opacity = 0.25;
      mask.strokeColor = "black";
      mask.fillColor = new paper.Color(0, 0, 0, 0.01);

      const border = mask.clone();
      border.strokeColor = "black";
      border.strokeWidth = 2;

      const tile = new paper.Group([mask, border]);
      tile.shadowColor = new paper.Color("#666");
      tile.shadowBlur = 1;
      tile.shadowOffset = new Point(-1, -1);
      tile.position = new Point(50, 50);

      tile.clipped = true;
      tile.opacity = 1;

      tile.shape = shape;

      tile.data.id = tileId ++;

      tiles.push(tile);
      tileIndexes.push(tiles.length - 1);
    }
  }

  return { tiles, tileIndexes };
};

export default createTiles;
