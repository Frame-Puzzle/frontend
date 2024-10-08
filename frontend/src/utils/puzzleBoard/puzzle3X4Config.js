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
  pieceWidth: 90,
  // 한 열당 퍼즐 개수 -> 행
  piecesPerRow: 3,
  // 한 행당 퍼즐 개수 -> 열
  piecesPerColumn: 4,

  coordinates: [
    [{ x: 65, y: 60.3 }, { x: 150, y: 65.5 }, { x: 230, y: 60.2 }],
    [{ x: 60, y: 140 }, { x: 145, y: 151 }, { x: 229.8, y: 145.5 }],
    [{ x: 65.3, y: 228.8 }, { x: 150, y: 239.5 }, { x: 230, y: 234.7 }],
    [{ x: 60.1, y: 313.8 }, { x: 140, y: 319.5 }, { x: 225, y: 314 }]
]

};

export default puzzle3X4Config;
