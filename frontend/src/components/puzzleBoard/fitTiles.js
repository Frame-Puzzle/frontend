import puzzle3X4Config from "../../utils/puzzleBoard/puzzle3X4Config";

const { coordinates, tilesPerRow } = puzzle3X4Config;
const fitTiles = (tiles) => {


  tiles.forEach((tile, index) => {
    const row = Math.floor(index / tilesPerRow);
    const col = index % tilesPerRow;

    tile.position.x = coordinates[row][col].x;
    tile.position.y = coordinates[row][col].y;
  });

};

export default fitTiles;
