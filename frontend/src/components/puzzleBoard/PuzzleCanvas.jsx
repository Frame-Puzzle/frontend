import React, { useEffect, useRef } from "react";
import paper from "paper";
import { useDispatch, useSelector } from "react-redux";
import createTiles from "./createTiles";
import puzzle3X4Config from "../../utils/puzzleBoard/puzzle3X4Config";
import fitTiles from "./fitTiles";

const PuzzleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // paper.js 초기화
    paper.setup(canvasRef.current);

    const boardConfig = puzzle3X4Config;

    // 퍼즐 조각 생성
    const { tiles, tileIndexes } = createTiles(boardConfig);

    // 퍼즐 조각 배치
    fitTiles(tiles, boardConfig);

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
