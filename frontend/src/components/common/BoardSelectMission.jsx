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
  // 리로드 아이콘 동적 UI를 위한 스위치
  let [reloadActive, setReloadActive] = useState(true);

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

  useEffect(() => {
    // 1. 3X4 Size에서는 prevMissions 길이가 8이면 리로드를 5번 한 것으로 간주하고, 리로드 아이콘을 비활성화 시킨다.
    if (num == 3 && prevMissions.length == 8) {
      // Switch On !
      setReloadActive(false);
    } else if (num == 4 && prevMissions.length == 9) {
      // Switch On !
      setReloadActive(false);
    } else if (num == 5 && prevMissions.length == 10) {
      // Switch On !
      setReloadActive(false);
    }
  }, [prevMissions]);

  return (
    <div>
      {
        missions.map((a, i) => {
          return (<Mission
            info={a}
            key={i}
            postGuides={postGuides}
            keywordList={keywordList}
            prevMissions={prevMissions}
            directoryId={directoryId}
            missions={missions}
            setMissions={setMissions}
            setPrevMissions={setPrevMissions}
            reloadActive={reloadActive} />)
        })
      }
    </div>
  )
}

export default BoardSelectMission;