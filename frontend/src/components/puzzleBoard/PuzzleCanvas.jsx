import React, { useEffect, useRef, useState } from "react";
import paper from "paper";
import createPieces from "./createPieces";
import fitPieces from "./fitPieces";

import puzzle3X4Config from "../../utils/puzzleBoard/puzzle3X4Config";
import puzzle4X5Config from "../../utils/puzzleBoard/puzzle4X5Config";
import puzzle5X6Config from "../../utils/puzzleBoard/puzzle5X6Config";

import { setPieceId } from "../../stores/pieceSlice";
import { useDispatch } from "react-redux";
import "./PuzzleCanvas.css";

const PuzzleCanvas = ({ boardSize, pieceId }) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // paper.js 초기화
    paper.setup(canvasRef.current);

    // 퍼즐 크기 지정
    let boardConfig;
    if (boardSize == 12) boardConfig = puzzle3X4Config;
    else if (boardSize == 20) boardConfig = puzzle4X5Config;
    else if (boardSize == 30) boardConfig = puzzle5X6Config;
    else {
      console.error("올바르지 않은 퍼즐판입니다.");
      return;
    }

    // 퍼즐 조각 생성
    const { pieces, pieceIndexes } = createPieces(boardConfig, pieceId);

    // 퍼즐 조각 배치
    fitPieces(pieces, boardConfig);

    // 클릭 이벤트 생성
    pieces.forEach((piece) => {
      piece.onMouseDown = (event) => {
        const data = {
          piece: piece,
          pieceWidth: boardConfig.pieceWidth,
        };
        dispatch(setPieceId(piece.data.id));
        //dispatch(setpieceInfo(data));
      };
    });

    return () => {
      paper.project.clear();
    };
  }, [boardSize, pieceId, dispatch]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="canvas"></canvas>
    </div>
  );
};

export default PuzzleCanvas;
