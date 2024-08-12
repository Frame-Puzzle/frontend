import React from "react";
import PuzzleCanvas from "../components/puzzleBoard/PuzzleCanvas";
import MainNav from "../components/common/MainNav";
import MainHeader from "../components/common/MainHeader";
import "./PuzzleBoard.css";

import boardApi from "../apis/boardApi";
import BoardModalFrame from "./modalFrame/BoardModalFrame";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setBoardId } from "../stores/waitingRoomSlice";
import {
  setVote,
  setModalId,
  setBoardCategory,
  setBoardKeywords,
} from "../stores/boardSlice";
import LoadingModal from "./LoadingModal";

const PuzzleBoard = () => {
  // 모달 창
  const [boardName, setBoardName] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [boardSize, setBoardSize] = useState(0);
  const [pieceId, setPieceId] = useState(0);
  const [pieceData, setPieceData] = useState([]);
  const [activateGameRoom, setActivateGameRoom] = useState(0);
  const [createRoom, setCreateRoom] = useState(false);

  const dispatch = useDispatch();

  const { boardID } = useParams();

  const piece = useSelector((state) => state.piece);
  const board = useSelector((state) => state.board);
  let directoryId = useSelector(state => state.createBoard.directoryId);
  let imgLoading = useSelector(state => state.loading.imgLoading);

  useEffect(() => {
    const fetchPuzzleData = async () => {
      const response = await boardApi.get(`/${boardID}`);
      const data = response.data.data;

      // 퍼즐판 정보 세팅
      setBoardName(data.directoryName + "#" + data.boardNum);
      setCategory(data.category);
      dispatch(setBoardCategory(data.category));
      if (data.keyword) {
        setKeywords(data.keyword);
        dispatch(setBoardKeywords(data.keyword));
      }

      setBoardSize(data.boardSize);
      setPieceId(data.pieceList[0].pieceId);
      setPieceData(data.pieceList);
      setActivateGameRoom(data.boardClearType);

      dispatch(setVote(data.voteStatus));
    };

    const fetchCreateGameRoom = async () => {
      const response = await boardApi.get(`/${boardID}/rooms`);
      const data = response.data.data;
      setCreateRoom(data.exist);
    };

    fetchPuzzleData();
    fetchCreateGameRoom();
  }, [piece.pieceId]);

  useEffect(() => {
    // 퍼즐 조각 클릭 여부 조회 후 모달 창 생성 혹은 삭제
    if (piece.pieceId !== 0) {
      // DB에서 정보 불러오는 시간
      setTimeout(() => {
        dispatch(setModalId(1));
      }, 500);
    } else {
      dispatch(setModalId(0));
    }
  }, [piece.pieceId]);

  return (
    <div className="w-full h-full flex flex-wrap relative">
      { imgLoading ? <LoadingModal /> : null }
      {board.modalId !== 0 ? <BoardModalFrame /> : null}
      <div className="board-header">
        <MainHeader
          title={boardName}
          icon={
            !board.vote && (
              <img
                src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/trash.png"
                alt="thirdIcon"
                className="header-icon"
                style={{ width: "40%", marginLeft: "7vw" }}
              />
            )
          }
          path={`/directories/${directoryId}`}
          category={category}
          page="퍼즐판"
          boardID={boardID}
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
        <div className="game-room-container">
          {!createRoom ? (
            <button
              className="game-room-button"
              disabled={activateGameRoom === 0}
              onClick={() => {
                dispatch(setBoardId(boardID));
                dispatch(setModalId(2));
              }}
            >
              게임 방 만들기
            </button>
          ) : (
            <button
              className="game-room-button"
              onClick={() => {
                dispatch(setBoardId(boardID));
                dispatch(setModalId(3));
              }}
            >
              게임 방 참여하기
            </button>
          )}
        </div>
      </div>

      <div className="board-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default PuzzleBoard;
