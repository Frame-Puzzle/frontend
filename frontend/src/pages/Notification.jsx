import { useNavigate } from "react-router-dom";
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
        const data = response.data.data.notificationList || []; // 전체 데이터, 없으면 빈 배열
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
              src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/notification-alarm-bell.png"
              alt="thirdIcon"
              className="icon-header"
              style={{ width: "38%", marginLeft: "7vw" }}
            />
          }
          path="/home"
        />
      </div>
      <div className="notification-main-content">
        {alarmData.length === 0 ? (
          <div className="alarm-empty-space">
            <img
              src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/notification-empty.png"
              alt="empty"
              className="alarm-empty-icon"
            />
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
