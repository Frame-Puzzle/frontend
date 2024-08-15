import { useEffect, useRef, useState } from "react";
import { Canvas, painters, outline, generators } from "headbreaker";
import "./GameBoard.css";
import { useSelector } from "react-redux";
import game4X4Config from "../../utils/gameBoard/game4X4Config";
import game8X8Config from "../../utils/gameBoard/game8X8Config";
import game6X6Config from "../../utils/gameBoard/game6X6Config";
import puzzleClickSound from "./puzzleClick.wav";

const GameBoard = ({ id, gameImg, sendEndGame }) => {
  const boardRef = useRef(null);
  const waitingRoom = useSelector((state) => state.waitingRoom);
  const audioRef = useRef(new Audio(puzzleClickSound));

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const boardElement = boardRef.current;
    const gameImgUrl = new Image();
    gameImgUrl.src = gameImg != null ? gameImg : waitingRoom.gameImgUrl;

    let config;

    const level = waitingRoom.level;

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

    gameImgUrl.onload = () => {
      // 퍼즐 세팅
      const canvas = new Canvas(boardElement.id, {
        outline: new outline.Rounded(),
        width: window.innerWidth * 0.95,
        height: window.innerHeight * 0.65,
        pieceSize: ((window.innerWidth * 0.5) / level),
        strokeWidth: 1.6,
        lineSoftness: 0.18,
        painter: new painters.Konva(),
        image: gameImgUrl,

        maxPiecesCount: { x: config.row, y: config.col },
        fixed: true,
        preventOffstageDrag: true,
      });

      const canvasElement = document.getElementById(boardElement.id);
      canvasElement.style.backgroundColor = "#f0f0f0";

      //이미지 높이 맞추기
       gameImgUrl.width >= gameImgUrl.height
         ? canvas.adjustImagesToPuzzleHeight() : canvas.adjustImagesToPuzzleWidth();

      canvas.autogenerate({
        horizontalPiecesCount: config.row,
        verticalPiecesCount: config.col,
      });

      canvas.shuffle(0.8);

      // 이미지 그리기
      canvas.draw();

      canvas.attachSolvedValidator();
      canvas.onValid(() => {
        sendEndGame();
      });

      canvas.onConnect((_piece, figure, _target, targetFigure) => {
        audioRef.current.play();

        figure.shape.stroke("#C3C7F4");
        targetFigure.shape.stroke("#C3C7F4");
        canvas.redraw();

        setTimeout(() => {
          figure.shape.stroke("black");
          targetFigure.shape.stroke("black");
          canvas.redraw();
        }, 200);
      });
    };
  };

  return <div ref={boardRef} id={id}></div>;
};

export default GameBoard;
