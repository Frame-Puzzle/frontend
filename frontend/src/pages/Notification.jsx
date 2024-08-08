import { useNavigate } from "react-router-dom";
import AlarmIcon from "../assets/icon/alarm-bell.svg";
import EmptyIcon from "../assets/icon/notification-empty.svg";
import MainHeader from "../components/common/MainHeader";
import MainNav from "../components/common/MainNav";
import NotificationApi from "../apis/NotificationApi";
import NotificationList from "../components/notification/NotificationList";
import "./Notification.css";

import { useEffect, useState } from "react";

// 날짜 형식을 "2024년 8월 7일"로 변환하는 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const Notification = () => {
  const nav = useNavigate();
  const [alarmData, setAlarmData] = useState([]);

  useEffect(() => {
    const fetchAlarmData = async () => {
      try {
        const response = await NotificationApi.get("");
        const data = response.data.notifications || []; // 전체 데이터, 없으면 빈 배열
        setAlarmData(data);
      } catch (error) {
        console.error(error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchAlarmData();
  }, []);

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
