import React, { useEffect, useState } from "react";
import "./PuzzleBoard.css";
import { useParams } from "react-router-dom";
import boardApi from "../apis/boardApi";
import UncompletedBoard from "./UncompletedBoard";
import CompletedBoard from "./CompletedBoard";


const PuzzleBoard = () => {

  const { boardID } = useParams();
  const [boardClearType, setBoardClearType] = useState(-1);

  // 우선 boardID Parameter를 이용해서 해당 퍼즐판이 완료된 퍼즐판인지, 완료되지 않은 퍼즐판인지 판단하는 작업이 필요하다.
  const isCompleted = async (boardID) => {
    try {
      const response = await boardApi.get(`/${boardID}`);
      // 0은 아직 사진이 전부 채워지지 않은 상태, 1은 사진은 다 채워진 상태, 2는 게임까지 완료한 상태
      // (아직 게임을 완료한 상태를 만들 수 없으므로 임시적으로 1을 2라고 생각하고 코드를 작성할 것)
      const boardClearType = response.data.data.boardClearType;
      // Test
      console.log(boardClearType);
      setBoardClearType(boardClearType);
    } catch (error) {
      console.error("Error fetching board clear type:", error);
    }
  };

  useEffect(() => {
    isCompleted(boardID);
  }, [])

  // 완료되지 않은 퍼즐판이라면 <UncompletedBoard boardID={boardID} />로 전달할 것
  // 완료된 퍼즐판이라면 <CompletedBoard boardID={boardID} />로 전달할 것
  if (boardClearType == 0) {
    return ( <UncompletedBoard boardID={boardID} /> )
  } else if (boardClearType == 1) { // 이건 테스트용 분기이며, 나중에 퍼즐게임이 구현되고 나면 이 분기도 고쳐야 한다.
    return ( <CompletedBoard boardID={boardID} /> )
  }

};

export default PuzzleBoard;
