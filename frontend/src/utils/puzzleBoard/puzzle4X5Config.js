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
  pieceWidth: 70,
  // 한 열당 퍼즐 개수 -> 행
  piecesPerRow: 4,
  // 한 행당 퍼즐 개수 -> 열
  piecesPerColumn: 5,

  coordinates: [
    [{ x: 44, y: 50 }, { x: 110.1, y: 50 }, { x: 179.3, y: 50 }, { x: 241.5, y: 50 }],
    [{ x: 44, y: 111.9 }, { x: 110.2, y: 116.2 }, { x: 179.3, y: 111.9 }, { x: 241.5, y: 111.9 }],
    [{ x: 44, y: 181 }, { x: 106.3, y: 185.5 }, { x: 179.3, y: 185 }, { x: 245.5, y: 185.1 }],
    [{ x: 44, y: 254.3 }, { x: 106.2, y: 250.6 }, { x: 179.3, y: 258.1 }, { x: 245.5, y: 254.3 }],
    [{ x: 48.2, y: 320.4 }, { x: 114, y: 316.3 }, { x: 183, y: 320.35 }, { x: 245.5, y: 316.3 }]
  ],

};

export default puzzle4X5Config;
