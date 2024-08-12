import { useEffect, useRef, useState } from "react";
import { Canvas, painters, outline } from "headbreaker";
import "./GameBoard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GameBoard = ({ id, sendEndGame }) => {
  const boardRef = useRef(null);
  const waitingRoom = useSelector((state) => state.waitingRoom);

  useEffect(() => {
    const boardElement = boardRef.current;

    const gameImg = new Image();
    gameImg.src = waitingRoom.gameImgUrl;

    const row = 2;
    const col = 2;

    gameImg.onload = () => {
      // 퍼즐 세팅
      const canvas = new Canvas(boardElement.id, {
        outline: new outline.Rounded(),
        width: 280,
        height: 350,

        pieceSize: 40,
        borderFill: 10,
        strokeWidth: 2,
        lineSoftness: 0.12,
        painter: new painters.Konva(),
        image: gameImg,
        maxPiecesCount: { x: row, y: col },
        fixed: true,
        preventOffstageDrag: true,
      });

      // 이미지 높이 맞추기
      canvas.adjustImagesToPuzzleHeight();

      // 퍼즐 자동 생성
      canvas.autogenerate({
        horizontalPiecesCount: row,
        verticalPiecesCount: col,
      });

      canvas.shuffleGrid();

      // 이미지 그리기
      canvas.draw();

      canvas.attachSolvedValidator();
      canvas.onValid(() => {
        console.log("성공");

        sendEndGame();
      });
    };
  }, []);

  return <div ref={boardRef} id={id}></div>;
};

export default GameBoard;
