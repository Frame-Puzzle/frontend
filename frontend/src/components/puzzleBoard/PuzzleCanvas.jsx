import React, { useEffect, useRef, useState } from "react";
import paper from "paper";
import createPieces from "./createPieces";
import fitPieces from "./fitPieces";

import puzzle3X4Config from "../../utils/puzzleBoard/puzzle3X4Config";
import puzzle4X5Config from "../../utils/puzzleBoard/puzzle4X5Config";
import puzzle5X6Config from "../../utils/puzzleBoard/puzzle5X6Config";

import {
  setPieceId,
  setComment,
  setImgUrl,
  setMission,
} from "../../stores/pieceSlice";
import { useDispatch, useSelector } from "react-redux";
import "./PuzzleCanvas.css";

import pieceApi from "../../apis/pieceApi";

const PuzzleCanvas = ({ boardSize, pieceId, pieceData }) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const piece = useSelector((state) => state.piece);

  const resetCanvas = () => {
    paper.project.clear();
    paper.view.update();
  };

  useEffect(() => {
    // paper.js 초기화
    paper.setup(canvasRef.current);

    if (pieceData.length === 0) return;
    resetCanvas();

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
    const { pieces, pieceIndexes } = createPieces(
      boardConfig,
      pieceId,
      pieceData
    );

    // 퍼즐 조각 배치
    fitPieces(pieces, boardConfig);

    // 클릭 이벤트 생성
    pieces.forEach((piece, index) => {
      piece.onMouseDown = (event) => {
        const fetchPiece = async () => {
          try {
            const response = await pieceApi.get(`${pieceId + index}`);

            console.log(response);
            const imgUrl = response.data.data.imgUrl;
            dispatch(setImgUrl(imgUrl));
            
            const comment = response.data.data.comment;
            if (comment) dispatch(setComment(comment));
            else dispatch(setComment(""));

            const mission = response.data.data.missionName;
            if (mission) dispatch(setMission(mission));
            else dispatch(setMission(""));
          } catch (error) {
            console.error("Error fetching piece:", error);
          }
        };

        fetchPiece();
        dispatch(setPieceId(piece.data.id));
      };
    });

    return () => {
      paper.project.clear();
    };
  });

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="canvas"></canvas>
    </div>
  );
};

export default PuzzleCanvas;
