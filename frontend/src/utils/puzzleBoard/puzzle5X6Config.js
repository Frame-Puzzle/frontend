const puzzle5X6Config = {
  // 퍼즐 조각 모양
  shapes: [
    { topTab: 0, rightTab: 1, bottomTab: -1, leftTab: 0 },
    { topTab: 0, rightTab: -1, bottomTab: 1, leftTab: -1 },
    { topTab: 0, rightTab: -1, bottomTab: -1, leftTab: 1 },
    { topTab: 0, rightTab: 1, bottomTab: 1, leftTab: 1 },
    { topTab: 0, rightTab: 0, bottomTab: -1, leftTab: -1 },
    { topTab: 1, rightTab: -1, bottomTab: -1, leftTab: 0 },
    { topTab: -1, rightTab: 1, bottomTab: 1, leftTab: 1 },
    { topTab: 1, rightTab: -1, bottomTab: 1, leftTab: -1 },
    { topTab: -1, rightTab: -1, bottomTab: 1, leftTab: 1 },
    { topTab: 1, rightTab: 0, bottomTab: 1, leftTab: 1 },
    { topTab: 1, rightTab: -1, bottomTab: -1, leftTab: 0 },
    { topTab: -1, rightTab: 1, bottomTab: 1, leftTab: 1 },
    { topTab: -1, rightTab: -1, bottomTab: -1, leftTab: -1 },
    { topTab: -1, rightTab: 1, bottomTab: -1, leftTab: 1 },
    { topTab: -1, rightTab: 0, bottomTab: 1, leftTab: -1 },
    { topTab: 1, rightTab: -1, bottomTab: -1, leftTab: 0 },
    { topTab: -1, rightTab: 1, bottomTab: -1, leftTab: 1 },
    { topTab: 1, rightTab: -1, bottomTab: -1, leftTab: -1 },
    { topTab: 1, rightTab: 1, bottomTab: 1, leftTab: 1 },
    { topTab: -1, rightTab: 0, bottomTab: 1, leftTab: -1 },
    { topTab: 1, rightTab: -1, bottomTab: 1, leftTab: 0 },
    { topTab: 1, rightTab: 1, bottomTab: 1, leftTab: 1 },
    { topTab: 1, rightTab: 1, bottomTab: 1, leftTab: -1 },
    { topTab: -1, rightTab: -1, bottomTab: 1, leftTab: -1 },
    { topTab: -1, rightTab: 0, bottomTab: 1, leftTab: 1 },
    { topTab: -1, rightTab: 1, bottomTab: 0, leftTab: 0 },
    { topTab: -1, rightTab: -1, bottomTab: 0, leftTab: -1 },
    { topTab: -1, rightTab: 1, bottomTab: 0, leftTab: 1 },
    { topTab: -1, rightTab: -1, bottomTab: 0, leftTab: -1 },
    { topTab: -1, rightTab: 0, bottomTab: 0, leftTab: 1 }
  ],
  // 타일 크기
  pieceWidth: 56,
  // 한 열당 퍼즐 개수 -> 행
  piecesPerRow: 5,
  // 한 행당 퍼즐 개수 -> 열
  piecesPerColumn: 6,

  coordinates: [
    [{ x: 39, y: 38 }, { x: 88.5, y: 41.1 }, { x: 140.2, y: 38 }, { x: 198.6, y: 41.1 }, { x: 251.2, y: 38 }],
    [{ x: 35.8, y: 87.5 }, { x: 88.5, y: 93.7 }, { x: 144, y: 90.6 }, { x: 195.2, y: 93.7 }, { x: 248.1, y: 90.5 }],
    [{ x: 35.8, y: 142.3 }, { x: 88.5, y: 148.6 }, { x: 144, y: 145.4 }, { x: 198.6, y: 145.4 }, { x: 251.2, y: 148.6 }],
    [{ x: 35.8, y: 196.9 }, { x: 88.5, y: 200.7 }, { x: 144, y: 196.9 }, { x: 198.6, y: 200.7 }, { x: 251.2, y: 203.6 }],
    [{ x: 35.8, y: 255.5 }, { x: 88.5, y: 255.5 }, { x: 146.8, y: 255.5}, { x: 198.6, y: 258.7}, { x: 248.1, y: 258.7 }],
    [{ x: 39, y: 308.3 }, { x: 88.5, y: 308.3 }, { x: 144, y: 308.3 }, { x: 198.6, y: 308.3 }, { x: 248.1, y: 308.3 }]
  ],


};

export default puzzle5X6Config;
