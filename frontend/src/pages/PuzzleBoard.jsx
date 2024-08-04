import React from "react";
import PuzzleCanvas from "../components/puzzleBoard/PuzzleCanvas";
import MainNav from "../components/common/MainNav";
import MainHeader from "../components/common/MainHeader";
import TempIcon from "../assets/icon/navh-directoryRename.svg";
import "./PuzzleBoard.css";
import directoryApi from "../apis/directoryApi";
import { useEffect } from "react";

const PuzzleBoard = () => {
  useEffect(() => {
    /*const fetchPuzzleData = async () => {
      //const response = await directoryApi
    }*/
  }, []);
  return (
    <div>
      <div className="board-header">
        <MainHeader
          title="폴더이름#1"
          icon={<img src={TempIcon} alt="thirdIcon" className="header-icon" />}
          category={"친구"}
        />
      </div>
      <div className="board-main-content">
        <div className="board-keywords">
          <div className="board-keyword">a</div>
          <div className="board-keyword">b</div>
          <div className="board-keyword">c</div>
        </div>
        <PuzzleCanvas />
      </div>

      <div className="board-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default PuzzleBoard;
