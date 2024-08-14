import { useEffect, useRef, useState } from "react";
import { Canvas, painters, outline, generators } from "headbreaker";
import "./GameBoard.css";
import { useSelector } from "react-redux";
import game4X4Config from "../../utils/gameBoard/game4X4Config";
import game8X8Config from "../../utils/gameBoard/game8X8Config";
import game6X6Config from "../../utils/gameBoard/game6X6Config";
import puzzleClickSound from './puzzleClick.wav';
import { cropImageToSquare } from "../../utils/cropImage";

const GameBoard = ({ id, sendEndGame }) => {
  const boardRef = useRef(null);
  const waitingRoom = useSelector((state) => state.waitingRoom);
  const audioRef = useRef(new Audio(puzzleClickSound));

  const [cropData, setCropData] = useState(null);
  
  useEffect(() => {
    cropImageToSquare(waitingRoom.gameImgUrl, (croppedImageUrl, err) => {
      if (err) {
        console.error("크롭 이미지 생성 실패", err);
        setCropData(waitingRoom.gameImgUrl);
        return;
      }
      setCropData(croppedImageUrl);
    });
  }, []);

  useEffect(() => {
    if (cropData != null) {
      init();      
    } 
  }, [cropData]);

  const init = (() => {    
    const boardElement = boardRef.current;
    const gameImg = new Image();
    gameImg.src = cropData != null ? cropData : waitingRoom.gameImgUrl;
    //gameImg.src = cropData != null ? cropData : waitingRoom.gameImgUrl;

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

    gameImg.onload = () => {
      // 퍼즐 세팅
      const canvas = new Canvas(boardElement.id, {
        outline: new outline.Rounded(),
        width: window.innerWidth * 0.95,
        height: window.innerHeight * 0.65,
        pieceSize: config.pieceSize,
        borderFill: 10,
        strokeWidth: 0.8,
        lineSoftness: 0.18,
        painter: new painters.Konva(),
        image: gameImg,

        maxPiecesCount: { x: config.row, y: config.col },
        fixed: true,
        preventOffstageDrag: true,
      });
                  
      const canvasElement = document.getElementById(boardElement.id);
      canvasElement.style.backgroundColor = '#f0f0f0';
      
      // 이미지 높이 맞추기
      canvas.adjustImagesToPuzzleHeight();
      canvas.adjustImagesToPuzzleWidth();

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

        figure.shape.stroke('#C3C7F4');
        targetFigure.shape.stroke('#C3C7F4');
        canvas.redraw();

        setTimeout(() => {
          figure.shape.stroke('black');
          targetFigure.shape.stroke('black');
          canvas.redraw();
        }, 200);
        
      });
    };
  });

  return <div ref={boardRef} id={id}></div>;
};

export default GameBoard;
