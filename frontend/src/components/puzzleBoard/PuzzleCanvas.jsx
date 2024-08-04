import React, { useEffect, useRef, useState } from "react";
import paper from "paper";
import createTiles from "./createTiles";
import fitTiles from "./fitTiles";

import puzzle3X4Config from "../../utils/puzzleBoard/puzzle3X4Config";
import puzzle4X5Config from "../../utils/puzzleBoard/puzzle4X5Config";
import puzzle5X6Config from "../../utils/puzzleBoard/puzzle5X6Config";

import { setTileId, setTileInfo } from "../../stores/tileSlice";
import { useDispatch } from "react-redux";
import "./PuzzleCanvas.css";

const PuzzleCanvas = ({ boardSize, tileId }) => {
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
    const { tiles, tileIndexes } = createTiles(boardConfig, tileId);

    // 퍼즐 조각 배치
    fitTiles(tiles, boardConfig);

    // 클릭 이벤트 생성
    tiles.forEach((tile) => {
      tile.onMouseDown = (event) => {
        const data = {
          tile: tile,
          tileWidth: boardConfig.tileWidth,
        };
        dispatch(setTileId(10));
        //dispatch(setTileInfo(data));
      };
    });

    return () => {
      paper.project.clear();
    };
  }, [boardSize, dispatch]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="canvas"></canvas>
    </div>
  );
};

export default PuzzleCanvas;
