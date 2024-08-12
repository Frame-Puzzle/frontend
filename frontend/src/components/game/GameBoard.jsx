import { useEffect, useRef, useState } from "react";
import { Canvas, painters, outline } from "headbreaker";
import "./GameBoard.css";
import { useSelector } from "react-redux";
import Konva from "konva";

const GameBoard = ({ id }) => {
  const boardRef = useRef(null);
  const waitingRoom = useSelector((state) => state.waitingRoom);

  useEffect(() => {
    const boardElement = boardRef.current;

    const gameImg = new Image();
    gameImg.src = waitingRoom.gameImgUrl;

    const row = 6;
    const col = 6;

    gameImg.onload = () => {
      // 퍼즐 세팅
      const canvas = new Canvas(boardElement.id, {
        outline: new outline.Rounded(),
        width: 280,
        height: 350,

        pieceSize: 45,
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
      
      console.log(canvas);
      console.log(canvas.__konvaLayer__);

      // 이미지 그리기
      canvas.draw();

      // 캔버스 하단 50px 영역을 회색으로 칠하기
      const layer = canvas.stage.findOne("Layer"); // 캔버스의 첫 번째 레이어 가져오기
      const rect = new Konva.Rect({
        x: 0,
        y: canvas.stage.height() - 50,
        width: canvas.stage.width(),
        height: 50,
        fill: "grey",
      });

      layer.add(rect); // 레이어에 회색 직사각형 추가
      layer.draw(); // 레이어 다시 그리기

      // 퍼즐 조각 이동 시 이벤트 추가
      Object.values(canvas.figures).forEach((figure) => {
        figure.group.on("dragmove", (event) => {
          console.log(
            `Piece Drug ${
              figure.group.index
            } moved to x: ${event.target.x()}, y: ${event.target.y()}`
          );
        });
      });

      // 퍼즐 조각 연결 조건
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

      // 퍼즐 조각이 연결되었을 경우 이벤트
      canvas.onConnect((_piece, figure, _target, targetFigure) => {
        console.log(
          `Pieces ${figure.id} and ${targetFigure.id} connected and locked.`
        );
      });

      // 퍼즐 조각이 이동되었을 경우 이벤트
      canvas.onTranslate((piece, _, x, y) => {
        console.log(`Piece Translate ${piece.id} moved to x: ${x}, y: ${y}`);
      });
    };
  }, []);

  return <div ref={boardRef} id={id}></div>;
};

export default GameBoard;
