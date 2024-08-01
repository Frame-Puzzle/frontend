import React, { useEffect, useRef, useState } from "react";
import paper from "paper";
import createTiles from "./createTiles";
import fitTiles from "./fitTiles";
import autoSnapTiles from "./autoSnapTiles";

import puzzle3X4Config from "../../utils/puzzleBoard/puzzle3X4Config";
import puzzle4X5Config from "../../utils/puzzleBoard/puzzle4X5Config";
import puzzle5X6Config from "../../utils/puzzleBoard/puzzle5X6Config";

import ChooseImg from "../modal/board/ChooseImg";
import "./PuzzleCanvas.css";

const PuzzleCanvas = () => {
  const canvasRef = useRef(null);

  // 모달 창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  useEffect(() => {
    // paper.js 초기화
    paper.setup(canvasRef.current);

    // 퍼즐 크기 지정
    const level = 2;
    let boardConfig;
    if (level == 1) boardConfig = puzzle3X4Config;
    else if (level == 2) boardConfig = puzzle4X5Config;
    else if (level == 3) boardConfig = puzzle5X6Config;
    else console.error("올바르지 않은 level입니다.");

    // 퍼즐 조각 생성
    const { tiles, tileIndexes } = createTiles(boardConfig);

    // 퍼즐 조각 배치
    fitTiles(tiles, boardConfig);
    //autoSnapTiles(tiles, boardConfig);

    // 클릭 이벤트 생성
    tiles.forEach((tile) => {
      tile.onClick = (event) => {
        const data = {
          tile: tile,
          tileWidth: boardConfig.tileWidth,
        };
        openModal(data, closeModal);
      };
    });

    return () => {
      paper.project.clear();
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="canvas"></canvas>
      {isModalOpen && <ChooseImg data={modalData} onClose={closeModal} />}
    </div>
  );
};

export default PuzzleCanvas;
