import puzzleMask from "./PuzzleMask";
import paper from "paper";
import { Point } from "paper/dist/paper-core";

const CreateTiles = (boardConfig) => {
  const { tilesPerColumn, tilesPerRow, tileWidth, shapes } = boardConfig;

  const tileRatio = tileWidth / 100;
  const tiles = [];
  const tileIndexes = [];

  for (let y = 0; y < tilesPerColumn; y++) {
    for (let x = 0; x < tilesPerRow; x++) {
      const shape = shapes[y * tilesPerRow + x];
      const mask = puzzleMask(
        tileRatio,
        shape.topTab,
        shape.rightTab,
        shape.bottomTab,
        shape.leftTab,
        tileWidth
      );

      mask.opacity = 0.25;
      mask.strokeColor = "black";

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

      tiles.push(tile);
      tileIndexes.push(tiles.length - 1);
    }
  }

  return { tiles, tileIndexes };
};

export default CreateTiles;
