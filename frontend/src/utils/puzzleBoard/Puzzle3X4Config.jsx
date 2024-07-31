const Puzzle3X4Config = {
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
  tileWidth: 64,
  // 한 열당 퍼즐 개수 -> 행
  tilesPerRow: 3,
  // 한 행당 퍼즐 개수 -> 열
  tilesPerColumn: 4,
};

export default Puzzle3X4Config;
