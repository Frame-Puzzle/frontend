const autoSnapTiles = (tiles, boardConfig) => {
  const { tileWidth, tilesPerRow } = boardConfig;

  tiles.forEach((tile, index) => {
    const x = index % tilesPerRow;
    const y = Math.floor(index / tilesPerRow);
    const shape = tile.shape;

    // 인접 타일과의 맞물림 체크 및 위치 조정
    if (x > 0) {
      const leftTile = tiles[index - 1];
      if (leftTile.shape.rightTab + shape.leftTab === 0) {
        tile.position.x = leftTile.position.x + tileWidth;
      }
    }
    if (y > 0) {
      const topTile = tiles[index - tilesPerRow];
      if (topTile.shape.bottomTab + shape.topTab === 0) {
        tile.position.y = topTile.position.y + tileWidth;
      }
    }
    console.log(x, y);
    console.log("x:", tile.position.x, "y:", tile.position.y);
  });
};

export default autoSnapTiles;