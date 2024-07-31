const fitTiles = (tiles, boardConfig) => {

  const { coordinates, tilesPerRow } = boardConfig;
  tiles.forEach((tile, index) => {
    const row = Math.floor(index / tilesPerRow);
    const col = index % tilesPerRow;

    tile.position.x = coordinates[row][col].x;
    tile.position.y = coordinates[row][col].y;
  });

};

export default fitTiles;
