import { useEffect, useRef, useState } from "react";
import { Canvas, painters, outline } from "headbreaker";
import "./GameBoard.css";
import { useSelector } from "react-redux";

const GameBoard = ({ id }) => {
  const boardRef = useRef(null);
  const waitingRoom = useSelector((state) => state.waitingRoom);

  useEffect(() => {
    const boardElement = boardRef.current;

    const gameImg = new Image();
    gameImg.src = waitingRoom.gameImgUrl;

    const row = 4;
    const col = 4;

    gameImg.onload = () => {
      // 퍼즐 세팅
      const canvas = new Canvas(boardElement.id, {
        outline: new outline.Rounded(),
        width: 600,
        height: 500,

        pieceSize: 64,
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

      // 이미지 그리기
      canvas.draw();

      // 퍼즐 이동 시 마다 이벤트 추가 -> 필요 없으면 지워도 됨
      Object.values(canvas.figures).forEach((figure) => {
        figure.group.on("dragmove", (event) => {
          console.log(
            `Piece Drug ${
              figure.group.index
            } moved to x: ${event.target.x()}, y: ${event.target.y()}`
          );
        });
      });

      /*퍼즐 붙이는 조건 
      위의 코드에서는 붙이는 부분이 
      맞물리는 경우에는 모두 붙이기 떄문에 조건 추가 필요*/
      // 옆에 있는 퍼즐조각일 경우에 붙도록 구현했는 위아래 등 확인 필요
      canvas.attachConnectionRequirement((one, other) => {
        const oneConfig = {
          row: Math.floor((one.id - 1) / row),
          col: (one.id - 1) % row,
        };
        const otherConfig = {
          row: Math.floor((other.id - 1) / col),
          col: (other.id - 1) % col,
        };

        if (
          oneConfig.row === otherConfig.row &&
          Math.abs(oneConfig.col - otherConfig.col) === 1
        ) {
          return true;
        } else if (
          oneConfig.col === otherConfig.col &&
          Math.abs(oneConfig.row - otherConfig.row) === 1
        ) {
          return true;
        }
        console.log(oneConfig, otherConfig);
        return false;
      });

      // 퍼즐 조각이 연결되었을 경우 출력되는 함수
      canvas.onConnect((_piece, figure, _target, targetFigure) => {
        console.log(
          `Pieces ${figure.id} and ${targetFigure.id} connected and locked.`
        );
      });

      /*퍼즐 조각이 연결되었을 떄 실행되는 함수 
      원래 위치에서 얼만큼 이동했는지 출력하는 거 같음*/
      canvas.onTranslate((piece, _, x, y) => {
        console.log(`Piece Translate ${piece.id} moved to x: ${x}, y: ${y}`);
      });
    };
  });

  return <div ref={boardRef} id={id}></div>;
};

export default GameBoard;
