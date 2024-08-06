const puzzle3X4Config = {
  // 퍼즐 조각 모양
  shapes: [
    {
      topTab: 0,
      rightTab: 1,
      bottomTab: -1,
      leftTab: 0,
    },
    {
      topTab: 0,
      rightTab: 1,
      bottomTab: 1,
      leftTab: -1,
    },
    {
      topTab: 0,
      rightTab: 0,
      bottomTab: -1,
      leftTab: -1,
    },
    {
      topTab: 1,
      rightTab: -1,
      bottomTab: -1,
      leftTab: 0,
    },
    {
      topTab: -1,
      rightTab: 1,
      bottomTab: 1,
      leftTab: 1,
    },
    {
      topTab: 1,
      rightTab: 0,
      bottomTab: 1,
      leftTab: -1,
    },
    {
      topTab: 1,
      rightTab: 1,
      bottomTab: -1,
      leftTab: 0,
    },
    {
      topTab: -1,
      rightTab: 1,
      bottomTab: 1,
      leftTab: -1,
    },
    {
      topTab: -1,
      rightTab: 0,
      bottomTab: -1,
      leftTab: -1,
    },
    {
      topTab: 1,
      rightTab: -1,
      bottomTab: 0,
      leftTab: 0,
    },
    {
      topTab: -1,
      rightTab: -1,
      bottomTab: 0,
      leftTab: 1,
    },
    {
      topTab: 1,
      rightTab: 0,
      bottomTab: 0,
      leftTab: 1,
    },
  ],
  // 타일 크기
  pieceWidth: 64,
  // 한 열당 퍼즐 개수 -> 행
  piecesPerRow: 3,
  // 한 행당 퍼즐 개수 -> 열
  piecesPerColumn: 4,

  coordinates: [
    [{ x: 50, y: 50 }, { x: 110, y: 54 }, { x: 167, y: 50 }],
    [{ x: 46, y: 107 }, { x: 106, y: 114 }, { x: 167, y: 110 }],
    [{ x: 50, y: 170 }, { x: 110, y: 178 }, { x: 167, y: 174 }],
    [{ x: 46, y: 231 }, { x: 102, y: 235 }, { x: 163, y: 231 }]
  ]

};

export default puzzle3X4Config;
