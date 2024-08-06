import { useState } from "react";
import "./BoardMissionOn.css";

// Create Board의 두 번째 전환 컴포넌트
const BoardMissionOn = () => {

  // Toggle button
  let [isChecked, setIsChecked] = useState(true);
  

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
      <div className="board-mission-on-toggle flex">
        <span>Mission</span>
        <div>
          <div className="onoffswitch">
            <input
              type="checkbox"
              name="onoffswitch"
              className="onoffswitch-checkbox"
              id="myonoffswitch"
              tabIndex="0"
              checked={isChecked}
              onChange={() => {
                setIsChecked(!isChecked);
              }}
            />
            <label className="onoffswitch-label" htmlFor="myonoffswitch">
              <span className="onoffswitch-inner"></span>
              <span className="onoffswitch-switch"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardMissionOn;