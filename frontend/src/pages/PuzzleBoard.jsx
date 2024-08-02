import React from "react";
import PuzzleCanvas from "../components/puzzleBoard/PuzzleCanvas";
import MainNav from "../components/common/MainNav";
import MainHeader from "../components/common/MainHeader";
import TempIcon from "../assets/icon/navh-directoryRename.svg";
import "./PuzzleBoard.css";

const PuzzleBoard = () => {
  return (
    <div className="w-full h-full flex flex-wrap">
      <div className="board-header">
        <MainHeader
          title="폴더이름#1"
          icon={<img src={TempIcon} alt="thirdIcon" className="header-icon" />}
          category={"친구"}
        />
      </div>
      <div className="board-main-content" style={{border:"solid 2px"}}>
        <PuzzleCanvas />
      </div>

      <div className="board-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default PuzzleBoard;
