import React from "react";
import PuzzleCanvas from "../components/puzzleBoard/PuzzleCanvas";

const PuzzleBoard = () => {
  return (
    <div className="w-full h-full flex flex-wrap">
      <PuzzleCanvas/>
    </div>
  );
};

export default PuzzleBoard;
