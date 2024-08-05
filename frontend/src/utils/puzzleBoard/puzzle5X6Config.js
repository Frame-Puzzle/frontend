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
  pieceWidth: 40,
  // 한 열당 퍼즐 개수 -> 행
  piecesPerRow: 5,
  // 한 행당 퍼즐 개수 -> 열
  piecesPerColumn: 6,

  coordinates: [
    [{ x: 50, y: 50 }, { x: 90, y: 50 }, { x: 130, y: 50 }, { x: 170, y: 50 }, { x: 210, y: 50 }],
    [{ x: 50, y: 90 }, { x: 90, y: 90 }, { x: 130, y: 90 }, { x: 170, y: 90 }, { x: 210, y: 90 }],
    [{ x: 50, y: 130 }, { x: 90, y: 130 }, { x: 130, y: 130 }, { x: 170, y: 130 }, { x: 210, y: 130 }],
    [{ x: 50, y: 170 }, { x: 90, y: 170 }, { x: 130, y: 170 }, { x: 170, y: 170 }, { x: 210, y: 170 }],
    [{ x: 50, y: 210 }, { x: 90, y: 210 }, { x: 130, y: 210 }, { x: 170, y: 210 }, { x: 210, y: 210 }],
    [{ x: 50, y: 250 }, { x: 90, y: 250 }, { x: 130, y: 250 }, { x: 170, y: 250 }, { x: 210, y: 250 }]
  ],


};

export default puzzle5X6Config;
