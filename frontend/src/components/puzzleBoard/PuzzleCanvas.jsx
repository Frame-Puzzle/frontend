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

  useEffect(() => {
    // paper.js 초기화
    const canvas = canvasRef.current;
    paper.setup(canvas);

    if (pieceData.length === 0) return;

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
      if (piece.data.authority === 4) {

        piece.onMouseDown = (event) => {
          alert("다른 사람이 올린 사진은 퍼즐이 완성되기 전까지 볼 수 없어요.")
        }
        return;
      }
      piece.onMouseDown = (event) => {
        const fetchPiece = async () => {
          try {
            const response = await pieceApi.get(`${pieceId + index}`);

            const imgUrl = response.data.data.imgUrl;
            dispatch(setImgUrl(imgUrl));

            const comment = response.data.data.comment;
            if (comment) dispatch(setComment(comment));
            else dispatch(setComment(""));

            const mission = response.data.data.missionName;
            if (mission) dispatch(setMission(mission));
            else dispatch(setMission(""));
            dispatch(setPieceId(piece.data.id));
          } catch (error) {
            console.error("Error fetching piece:", error);
          }
        };
        fetchPiece();
      };
    });

    return () => {
      paper.project.clear();
    };
  });

  return (
    <div className="puzzle-canvas-container">
      <canvas ref={canvasRef} className="puzzle-canvas"></canvas>
    </div>
  );
};

export default PuzzleCanvas;
