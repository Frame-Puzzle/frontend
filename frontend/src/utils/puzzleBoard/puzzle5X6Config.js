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
    [{ x: 39, y: 43 }, { x: 88.5, y: 46.1 }, { x: 140.2, y: 43 }, { x: 198.6, y: 46.1 }, { x: 251.2, y: 43 }],
    [{ x: 35.8, y: 92.5 }, { x: 88.5, y: 98.7 }, { x: 144, y: 95.6 }, { x: 195.2, y: 98.7 }, { x: 248.1, y: 95.5 }],
    [{ x: 35.8, y: 147.3 }, { x: 88.5, y: 153.6 }, { x: 144, y: 150.4 }, { x: 198.6, y: 150.4 }, { x: 251.2, y: 153.6 }],
    [{ x: 35.8, y: 201.9 }, { x: 88.5, y: 205.7 }, { x: 144, y: 201.9 }, { x: 198.6, y: 205.7 }, { x: 251.2, y: 208.6 }],
    [{ x: 35.8, y: 260.5 }, { x: 88.5, y: 260.5 }, { x: 146.8, y: 260.5}, { x: 198.6, y: 263.7}, { x: 248.1, y: 263.7 }],
    [{ x: 39, y: 313.3 }, { x: 88.5, y: 313.3 }, { x: 144, y: 313.3 }, { x: 198.6, y: 313.3 }, { x: 248.1, y: 313.3 }]
]

};

export default puzzle5X6Config;
