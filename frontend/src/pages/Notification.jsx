import { useNavigate } from "react-router-dom";
import AlarmIcon from "../assets/icon/alarm-bell.svg";
import EmptyIcon from "../assets/icon/notification-empty.svg";
import MainHeader from "../components/common/MainHeader";
import MainNav from "../components/common/MainNav";
import NotificationApi from "../apis/NotificationApi";
import NotificationList from "../components/notification/NotificationList";
import "./Notification.css";
import { useEffect, useState } from "react";

const Notification = () => {
  const nav = useNavigate();
  const [alarmData, setAlarmData] = useState([]);

  useEffect(() => {
    const fetchAlarmData = async () => {
      try {
        const response = await NotificationApi.get("");
        console.log("response get ", response);
        console.log("response data: ", response.data);
        const data = response.data.data.notificationList || []; // 전체 데이터, 없으면 빈 배열
        console.log("get 데이터", data);
        setAlarmData(data);
      } catch (error) {
        console.error("Error fetching alarm data: ", error);
        alert("알림 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchAlarmData();
  }, []); // 빈 배열을 의존성 배열로 전달하여 컴포넌트 마운트 시 한 번만 실행되도록 함

  return (
    <div className="w-full h-full">
      <div className="notification-header">
        <MainHeader
          title="Notification"
          icon={
            <img
              src={AlarmIcon}
              alt="thirdIcon"
              className="icon-header"
              onClick={() => nav("/testrtc")}
            />
          }
        />
      </div>
      <div className="notification-main-content">
        {alarmData.length === 0 ? (
          <div className="alarm-empty-space">
            <img src={EmptyIcon} alt="empty" className="alarm-empty-icon" />
            <div className="alarm-empty-text">아직 알림이 없네요!</div>
          </div>
        ) : (
          <NotificationList notifications={alarmData} />
        )}
      </div>
      <div className="notification-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default Notification;
