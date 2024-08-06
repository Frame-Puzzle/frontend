import "./BoardMissionOn.css";

// Create Board의 두 번째 전환 컴포넌트
const BoardMissionOn = () => {
  return (
    <div className="board-mission-on w-full h-full">
      <div className="board-mission-on-progress flex">
        <span>1</span>
        <span>2</span>
      </div>
      <div className="board-mission-on-title">
        <span>미션 여부를</span>
        <span>선택해 주세요</span>
      </div>
    </div>
  )
}

export default BoardMissionOn;