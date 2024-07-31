import React, { useEffect, useRef } from "react";
import paper from "paper";
import { useDispatch, useSelector } from "react-redux";
import CreateTiles from "./CreateTiles";
import Puzzle3X4Config from "../../utils/puzzleBoard/Puzzle3X4Config";

const PuzzleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // paper.js 초기화
    paper.setup(canvasRef.current);

    const boardConfig = Puzzle3X4Config;

    const tiles = CreateTiles(boardConfig);

    return () => {
      paper.project.clear();
    };
  }, []);

  return (
    <div>
      <canvas
        style={{ width: "300spx", height: "300px" }}
        ref={canvasRef}
        className="canvas"
      ></canvas>
    </div>
  );
};

export default PuzzleCanvas;
