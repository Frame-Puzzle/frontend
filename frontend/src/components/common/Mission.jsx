import "./Mission.css";

const Mission = ({ info, postGuides, keywordList, prevMissions, directoryId, setMissions, missions, setPrevMissions, reloadActive }) => {
  return (
    <div className="mission flex">
      <span>{info}</span>
      {
        reloadActive ? <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/reload-icon.png" alt="reload-icon" onClick={(e) => {
          // 1. 이벤트 버블링 방지
          e.stopPropagation();
          // 2. num 인자를 1로 고정한 axios POST 요청 (Cannot use keyword 'await' outside an async function)
          const asyncPostGuides = async (keywordList, prevMissions, directoryId) => {
            const guideList = await postGuides(keywordList, 1, prevMissions, directoryId);
            // guideList[0]이 실제 미션 문자열  // missions에서는 기존의 응답을 교체하기
            let newArr = missions.map(item => item === info ? guideList[0] : item);
            setMissions(newArr);
            // prevMissions에서는 새로운 응답을 뒤에 추가하기
            let deepcopy = [...prevMissions];
            deepcopy.push(guideList[0]);
            setPrevMissions(deepcopy);
          }
          asyncPostGuides(keywordList, prevMissions, directoryId);
        }} /> : null
      }
    </div>
  )
}

export default Mission;