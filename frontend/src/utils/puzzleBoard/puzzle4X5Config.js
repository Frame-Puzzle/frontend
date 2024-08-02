const puzzle4X5Config = {
  // 퍼즐 조각 모양
  shapes: [
    { topTab: 0, rightTab: -1, bottomTab: -1, leftTab: 0 },
    { topTab: 0, rightTab: 1, bottomTab: -1, leftTab: 1 },
    { topTab: 0, rightTab: -1, bottomTab: -1, leftTab: -1 },
    { topTab: 0, rightTab: 0, bottomTab: -1, leftTab: 1 },
    { topTab: 1, rightTab: -1, bottomTab: -1, leftTab: 0 },
    { topTab: 1, rightTab: 1, bottomTab: 1, leftTab: 1 },
    { topTab: 1, rightTab: -1, bottomTab: -1, leftTab: -1 },
    { topTab: 1, rightTab: 0, bottomTab: -1, leftTab: 1 },
    { topTab: 1, rightTab: -1, bottomTab: -1, leftTab: 0 },
    { topTab: -1, rightTab: -1, bottomTab: -1, leftTab: 1 },
    { topTab: 1, rightTab: 1, bottomTab: 1, leftTab: 1 },
    { topTab: 1, rightTab: 0, bottomTab: 1, leftTab: -1 },
    { topTab: 1, rightTab: -1, bottomTab: 1, leftTab: 0 },
    { topTab: 1, rightTab: -1, bottomTab: -1, leftTab: 1 },
    { topTab: -1, rightTab: 1, bottomTab: 1, leftTab: 1 },
    { topTab: -1, rightTab: 0, bottomTab: -1, leftTab: -1 },
    { topTab: -1, rightTab: 1, bottomTab: 0, leftTab: 0 },
    { topTab: 1, rightTab: 1, bottomTab: 0, leftTab: -1 },
    { topTab: -1, rightTab: 1, bottomTab: 0, leftTab: -1 },
    { topTab: 1, rightTab: 0, bottomTab: 0, leftTab: -1 }
  ],
  // 타일 크기
  tileWidth: 52,
  // 한 열당 퍼즐 개수 -> 행
  tilesPerRow: 4,
  // 한 행당 퍼즐 개수 -> 열
  tilesPerColumn: 5,

  coordinates: [
    [{ x: 50, y: 50 }, { x: 102, y: 50 }, { x: 154, y: 50 }, { x: 206, y: 50 }],
    [{ x: 50, y: 102 }, { x: 102, y: 102 }, { x: 154, y: 102 }, { x: 206, y: 102 }],
    [{ x: 50, y: 154 }, { x: 102, y: 154 }, { x: 154, y: 154 }, { x: 206, y: 154 }],
    [{ x: 50, y: 206 }, { x: 102, y: 206 }, { x: 154, y: 206 }, { x: 206, y: 206 }],
    [{ x: 50, y: 258 }, { x: 102, y: 258 }, { x: 154, y: 258 }, { x: 206, y: 258 }]
  ],

};

export default puzzle4X5Config;
