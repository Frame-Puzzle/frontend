import { useNavigate } from "react-router-dom";
import GameOpenvidu from "../gameTalk/GameOpenvidu";

const Notification = () => {
  const nav = useNavigate();
  return (
    <>
      <div>알림페이지</div>
      <button
        onClick={() => {
          nav("/testrtc");
        }}
      >
        rtc test 페이지
      </button>
    </>
  );
};

export default Notification;
