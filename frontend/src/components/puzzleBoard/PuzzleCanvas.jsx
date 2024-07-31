import React, { useEffect, useRef } from "react";
import paper from "paper";
import createTiles from "./createTiles";
import puzzle3X4Config from "../../utils/puzzleBoard/puzzle3X4Config";
import puzzle4X5Config from "../../utils/puzzleBoard/puzzle4X5Config";
import fitTiles from "./fitTiles";
import autoSnapTiles from "./autoSnapTiles";

const PuzzleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // paper.js 초기화
    paper.setup(canvasRef.current);
    
    // 퍼즐 크기 지정
    const level = 2;
    let boardConfig;
    if(level == 1) boardConfig = puzzle3X4Config;
    else if(level == 2) boardConfig = puzzle4X5Config;
    

    // 퍼즐 조각 생성
    const { tiles, tileIndexes } = createTiles(boardConfig);

    // 퍼즐 조각 배치
    fitTiles(tiles, boardConfig);
    //autoSnapTiles(tiles, boardConfig);

    return () => {
      paper.project.clear();
    };
  }, []);

  return (
    <div>
      <canvas
        style={{ width: "300px", height: "300px" }}
        ref={canvasRef}
        className="canvas"
      ></canvas>
    </div>
  );
};

export default PuzzleCanvas;
