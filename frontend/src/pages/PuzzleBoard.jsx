import React from "react";
import PuzzleCanvas from "../components/puzzleBoard/PuzzleCanvas";
import MainNav from "../components/common/MainNav";
import MainHeader from "../components/common/MainHeader";
import "./PuzzleBoard.css";

import boardApi from "../apis/boardApi";
import BoardModalFrame from "./modalFrame/BoardModalFrame";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PuzzleBoard = () => {
  // 모달 창
  const [modal, setModal] = useState(false);
  const { boardID } = useParams();

  const tile = useSelector((state) => state.tile);

  useEffect(() => {
    const fetchPuzzleData = async () => {
      const response = await directoryApi.get(`/boards/${boardID}`);
      console.log(response);
    };

    fetchPuzzleData();
    // 퍼즐 조각 클릭 여부 조회 후 모달 창 생성 혹은 삭제
    if (tile.tileId !== 0) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [tile.tileId]);
  return (
    <div className="w-full h-full flex flex-wrap relative">
      {modal ? <BoardModalFrame setModal={setModal} /> : null}
      <div className="board-header">
        <MainHeader
          title="폴더이름#1"
          icon={
            <img
              src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/trash.png"
              alt="thirdIcon"
              className="header-icon"
            />
          }
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
