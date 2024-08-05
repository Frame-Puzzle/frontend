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
  const [boardName, setBoardName] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [boardSize, setBoardSize] = useState(0);
  const [pieceId, setPieceId] = useState(0);
  const [pieceData, setPieceData] = useState([]);

  const { boardID } = useParams();

  const piece = useSelector((state) => state.piece);

  useEffect(() => {
    const fetchPuzzleData = async () => {
      const response = await boardApi.get(`/${boardID}`);
      const data = response.data.data;

      // 퍼즐판 정보 세팅
      setBoardName(data.directoryName + "#" + data.boardNum);
      setCategory(data.category);
      setKeywords(data.keyword);
      setBoardSize(data.boardSize);
      setPieceId(data.pieceList[0].pieceId);
      setPieceData(data.pieceList);
    };

    fetchPuzzleData();
  }, []);

  useEffect(() => {
    // 퍼즐 조각 클릭 여부 조회 후 모달 창 생성 혹은 삭제
    if (piece.pieceId !== 0) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [piece.pieceId]);

  return (
    <div className="w-full h-full flex flex-wrap relative">
      {modal ? <BoardModalFrame /> : null}
      <div className="board-header">
        <MainHeader
          title={boardName}
          icon={
            <img
              src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/trash.png"
              alt="thirdIcon"
              className="header-icon"
            />
          }
          category={category}
        />
      </div>
      <div className="board-main-content">
        <div className="board-keywords">
          {keywords.map((keyword, index) => (
            <div key={index} className="board-keyword">
              {keyword}
            </div>
          ))}
        </div>
        <PuzzleCanvas
          boardSize={boardSize}
          pieceId={pieceId}
          pieceData={pieceData}
        />
      </div>

      <div className="board-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default PuzzleBoard;
