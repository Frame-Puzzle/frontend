import React, { useEffect, useRef } from "react";
import paper from "paper";

import puzzle3X4Config from "../../utils/puzzleBoard/puzzle3X4Config";
import puzzle4X5Config from "../../utils/puzzleBoard/puzzle4X5Config";
import puzzle5X6Config from "../../utils/puzzleBoard/puzzle5X6Config";

import createPieces from "./createPieces";
import fitPieces from "../puzzleBoard/fitPieces";
import pieceApi from "../../apis/pieceApi";

import "./DirectoryCanvas.css";

const DirectoryCanvas = ({ boardSize }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // paper.js 초기화
    paper.setup(canvasRef.current);

    console.log(boardSize);

    // 퍼즐 크기 지정
    let boardConfig;
    if (boardSize === 12) boardConfig = puzzle3X4Config;
    else if (boardSize === 20) boardConfig = puzzle4X5Config;
    else if (boardSize === 30) boardConfig = puzzle5X6Config;
    else {
      console.error("올바르지 않은 퍼즐판입니다.");
      return;
    }

    // 퍼즐 조각 생성
    const { pieces } = createPieces(boardConfig);

    // 퍼즐 조각 배치
    fitPieces(pieces, boardConfig);

    return () => {
      //paper.project.clear();
    };
  }, [boardSize]);

  return (
    <div className="directory-canvas-container">
      <canvas ref={canvasRef} className="directory-canvas"></canvas>
    </div>
  );
};

export default DirectoryCanvas;
