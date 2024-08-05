import { useNavigate } from "react-router-dom";
import AlarmIcon from "../assets/icon/alarm-bell.svg";
import EmptyIcon from "../assets/icon/notification-empty.svg";
import MainHeader from "../components/common/MainHeader";
import MainNav from "../components/common/MainNav";
import "./Notification.css";

const Notification = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="w-full h-full">
        <div className="notification-header">
          {/* <MainHeader />에 icon props로 건네주는 img의 width는 항상 120%로 고정하는 것으로 약속한다. */}
          <MainHeader
            title="Notification"
            icon={
              <img src={AlarmIcon} alt="thirdIcon" className="icon-header" />
            }
          />
        </div>
        <div className="notification-main-content">
          <div className="alarm-empty-space">
            <img src={EmptyIcon} alt="empty" className="alarm-empty-icon" />
            <div>아직 알림이 없네요!</div>
          </div>
          <div>알림페이지</div>
          <button
            onClick={() => {
              nav("/testrtc");
            }}
          >
            rtc test 페이지
          </button>
        </div>
        <div className="notification-footer">
          <MainNav />
        </div>
      </div>
    </>
  );
};

export default Notification;
