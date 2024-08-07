/*eslint-disable*/
import { useEffect, useState } from "react";
import "./BoardSelectMission.css";
import directoryApi from "../../apis/directoryApi";
import { useSelector } from "react-redux";
import Mission from "./Mission";

// Create Board의 세 번째 전환 컴포넌트
const BoardSelectMission = () => {

  // map 반복문을 돌면서 Guide(Mission) 보여질 Array (재생성 응답시 교체)
  let [missions, setMissions] = useState([]);
  // 이전 Mission들을 전부 담아두는 Array (재생성 응답시 추가)
  let [prevMissions, setPrevMissions] = useState([]);

  // 이 퍼즐판이 어느 디렉토리에 속해 있는지
  let directoryId = useSelector(state => state.createBoard.directoryId);
  // 키워드는 무엇인지
  let keywordList = useSelector(state => state.createBoard.keyWord);
  // 퍼즐판 크기에 따른 미션 수령 개수는 몇 개인지
  let num = useSelector(state => state.createBoard.missionCnt);

  // 백에게 가이드(미션) 생성 요청을 하고, 가이드를 받아오는 함수 정의
  const postGuides = async (keywordList, num, preMission, directoryId) => {
    try {
      // Request Body 데이터 가공
      const requestData = {
        keywordList: keywordList,
        num: num,
        preMissionList: preMission
      };
      // 백엔드에 POST 요청을 보내기
      const response = await directoryApi.post(`/${directoryId}/guides`, requestData);
      // 응답 데이터에서 가이드 리스트를 반환
      return response.data.data.guideList;
    } catch (error) {
      console.error('Error posting guides', error);
      throw error;
    }
  }

  useEffect(() => {
    // mount 되자마자 가이드 생성 API 호출..을 위한 재료 준비를 위에서..
    // useEffect에서 비동기 함수 호출하려면 이 안에서 정의가 선행되어야 한다.
    const uePostGuides = async (keywordList, num, preMission, directoryId) => {
      const guideList = await postGuides(keywordList, num, preMission, directoryId);
      let deepcopy1 = [...guideList];
      setMissions(deepcopy1);
      let deepcopy2 = [...guideList];
      setPrevMissions(deepcopy2);
    }
    // 이제 호출 가능
    uePostGuides(keywordList, num, prevMissions, directoryId);
  }, []);

  return (
    <div>
      {
        missions.map((a, i) => {
          return (<Mission info={a} />)
        })
      }
    </div>
  )
}

export default BoardSelectMission;