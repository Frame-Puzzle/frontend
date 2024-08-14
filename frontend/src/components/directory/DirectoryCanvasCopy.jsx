import React, { useEffect, useRef, useState } from "react";
import paper from "paper";
import puzzle3X4Config from "../../utils/puzzleBoard/puzzle3X4Config";
import puzzle4X5Config from "../../utils/puzzleBoard/puzzle4X5Config";
import puzzle5X6Config from "../../utils/puzzleBoard/puzzle5X6Config";
import createPieces from "./createPieces";
import fitPieces from "../puzzleBoard/fitPieces";
import pieceApi from "../../apis/pieceApi";
import "./DirectoryCanvasCopy.css";

const DirectoryCanvasCopy = ({ boardSize, thumbnailURL }) => {
  const canvasRef = useRef(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    // paper.js 초기화
    paper.setup(canvasRef.current);

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

    // thumbnailURL이 null인 경우 빈 문자열로 바꾸기
    if (thumbnailURL) {
      setThumbnailUrl(thumbnailURL);
    } else {
      setThumbnailUrl('');
    }

    return () => {
      //paper.project.clear();
    };
  }, [boardSize, thumbnailURL]);

  const getCanvasHeight = () => {
    if (boardSize === 12) return "380px";
    if (boardSize === 20) return "370px";
    if (boardSize === 30) return "360px";
    return "380px"; // 기본값
  };

  return (
    <div className="directory-canvas-container-copy">
      <canvas ref={canvasRef} className="directory-canvas-copy"
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
          height: getCanvasHeight(),
          backgroundSize: "cover"
        }}></canvas>
    </div>
  );
};

export default DirectoryCanvasCopy;
