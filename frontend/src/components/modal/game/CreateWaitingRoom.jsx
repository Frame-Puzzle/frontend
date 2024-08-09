import React, { useEffect, useState } from "react";
import "./CreateWaitingRoom.css";
import boardApi from "../../../apis/boardApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setGameImgUrl,
  setdirectoryName,
} from "../../../stores/waitingRoomSlice";

const CreateWaitingRoom = ({ setModal }) => {
  const waitingRoom = useSelector((state) => state.waitingRoom);
  const dispatch = useDispatch();

  const [level, setLevel] = useState(0);

  useEffect(() => {
    const fetchGetGameImage = async () => {
      const response = await boardApi.get(`/${waitingRoom.boardId}/games`);
      const data = response.data.data;

      dispatch(setGameImgUrl(data.imgUrl));
      dispatch(setdirectoryName(data.directoryName));
    };

    fetchGetGameImage();
  }, []);
  return (
    <>
      <div className="create-waiting-modal">
        <div className="create-waiting-modal-header flex">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/x-symbol.png"
            alt="x-symbol"
            className="x-symbol"
            onClick={() => setModal(0)}
          />
        </div>
        <div className="create-waiting-modal-body">
          <img
            className="waiting-room-img"
            src={waitingRoom.gameImgUrl}
            alt=""
          />
          <div className="set-game-level-container">
            <span className="level-text">Level</span>
            <div className="select-levels">
              <button
                onClick={() => setLevel(1)}
                className={level !== 1 ? "select-level" : "selected-level"}
              >
                <b>easy</b>
                <br />
                6X6
              </button>
              <button
                onClick={() => setLevel(2)}
                className={level !== 2 ? "select-level" : "selected-level"}
              >
                <b>normal</b>
                <br />
                9X9
              </button>
              <button
                onClick={() => setLevel(3)}
                className={level !== 3 ? "select-level" : "selected-level"}
              >
                <b>hard</b>
                <br />
                12X12
              </button>
            </div>
          </div>
          <div className="waiting-room-note">
            <span className="note-title">유의 사항</span>
            <span className="note-content">
              {`· 과반수 이상이 참여해야 게임 시작 버튼이 활성화됩니다.
  · 게임 방 생성 후 5분 내로 시작하지 않으면 게임 방은 종료됩니다.
  · 퍼즐은 퍼즐 판당 1회 완성할 수 있습니다.`}
            </span>
          </div>
        </div>
        <div className="create-room-button">
          게임 방 만들기
        </div>
      </div>
    </>
  );
};

export default CreateWaitingRoom;
