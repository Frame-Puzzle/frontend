import { useEffect, useRef, useState } from "react";
import { Canvas, painters, outline, generators } from "headbreaker";
import "./GameBoard.css";
import { useSelector } from "react-redux";
import game4X4Config from "../../utils/gameBoard/game4X4Config";
import game8X8Config from "../../utils/gameBoard/game8X8Config";
import game6X6Config from "../../utils/gameBoard/game6X6Config";

const GameBoard = ({ id, sendEndGame }) => {
  const boardRef = useRef(null);
  const waitingRoom = useSelector((state) => state.waitingRoom);

  useEffect(() => {
    const boardElement = boardRef.current;

    const gameImg = new Image();
    gameImg.src = waitingRoom.gameImgUrl;

    const level = waitingRoom.level;

    let config;
    switch (level) {
      case 4:
        config = game4X4Config;
        break;
      case 6:
        config = game6X6Config;
        break;
      case 8:
        config = game8X8Config;
        break;
      default:
        return;
    }

    gameImg.onload = () => {
      // 퍼즐 세팅
      const canvas = new Canvas(boardElement.id, {
        outline: new outline.Rounded(),
        width: config.boardWidth,
        height: config.boardHeight,
        pieceSize: config.pieceSize,

        borderFill: 10,
        strokeWidth: 2,
        lineSoftness: 0.12,
        painter: new painters.Konva(),
        image: gameImg,

        maxPiecesCount: { x: config.row, y: config.col },
        fixed: true,
        preventOffstageDrag: true,
      });

      // 이미지 높이 맞추기
      canvas.adjustImagesToPuzzleHeight();

      canvas.autogenerate({
        horizontalPiecesCount: config.row,
        verticalPiecesCount: config.col,
      });
      //canvas.shuffle(0.8);

      // 이미지 그리기
      canvas.draw();

      canvas.attachSolvedValidator();
      canvas.onValid(() => {
        sendEndGame();
      });
    };
  }, []);

  return <div ref={boardRef} id={id}></div>;
};

export default GameBoard;
