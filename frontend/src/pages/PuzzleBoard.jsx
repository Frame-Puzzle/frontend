import React from "react";
import PuzzleCanvas from "../components/board/PuzzleCanvas";

const PuzzleBoard = () => {
  return (
    <div className="w-full h-full flex flex-wrap">
      <PuzzleCanvas/>
    </div>
  );
};

export default PuzzleBoard;
