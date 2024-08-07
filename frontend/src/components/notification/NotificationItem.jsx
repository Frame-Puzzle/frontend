// 알림페이지 하나의 요소
import { useEffect, useState } from "react";
import "./NotificationItem.css";
import { useNavigate } from "react-router-dom";
import NotificationApi from "../../apis/NotificationApi";

// 눌렀을 때 routing은 없고, 읽음 여부 바꿔줘야함.
// type
// 0: 디렉토리 유저초대 (참여, 거절 버튼)
// 1: 퍼즐판 board 삭제 투표 (수락, 거절 버튼)
// 2: 퍼즐판 완성
// 3: 게임방 생성 (퍼즐 게임 하러가기 버튼)

// 필요한 item
// 1. 프로필 이미지
// 2. 알림 날짜
// 3. 안읽음 표시 빨간등 isread
// 4. 퍼즐 게임 하러가기
const NotificationItem = ({ item }) => {
  const nav = useNavigate();
  const [isRead, setIsRead] = useState(item.isread); // 버튼 눌렀을 때 읽음 바로 확인해주기 위해
  const [showButtons, setShowButtons] = useState(true);

  // 빨간 점 표시
  useEffect(() => {
    setIsRead(item.isread);
  }, [item.isread]);

  const handleAcceptedToggle = async (acceptValue) => {
    try {
      await NotificationApi.put(`/${item.notificationId}`, {
        notificationId: item.notificationId,
        isRead: true,
        accept: acceptValue,
      });
      setIsRead(true);
      setShowButtons(false);
    } catch (error) {
      console.error("알림 업데이트 실패", error);
    }
  };

  const getContent = () => {
    switch (item.type) {
      case 0: // 유저 초대
        return `${item.createUserName}님이 ${item.category} 모임 ${item.directoryName}에 초대를 보냈습니다`;
      case 1: // 퍼즐판 board 삭제 투표
        return `${item.createUserName}님이 ${item.category} 모임 ${
          item.directoryName
        }의 ${`#${item.boardNum}`}의 삭제 투표를 시작했어요!`;
      case 2: // 퍼즐판 완성
        return `${item.createUserName}님의 ${item.category} 모임 ${item.directoryName} 퍼즐 조각이 모두 모였어요!`;
      case 3: // 게임방 생성
        return `${item.createUserName}님이 ${item.category} 모임 ${item.directoryName} 퍼즐 게임을 시작했습니다`;
      default:
        return "알 수 없는 알림 유형입니다.";
    }
  };

  const getButton = () => {
    if (!showButtons) return null;
    switch (item.type) {
      case 0: // 유저 초대
        return (
          <>
            <button
              onClick={() => {
                handleAcceptedToggle();
                setShowButtons(false);
              }}
            >
              참여
            </button>
            <button
              onClick={() => {
                handleAcceptedToggle();
                setShowButtons(false);
              }}
            >
              거절
            </button>
          </>
        );
      case 1: // 퍼즐판 board 삭제 투표
        return (
          <>
            <button
              onClick={() => {
                handleAcceptedToggle();
                setShowButtons(false);
              }}
            >
              수락
            </button>
            <button
              onClick={() => {
                handleAcceptedToggle();
                setShowButtons(false);
              }}
            >
              거절
            </button>
          </>
        );
      case 2: // 퍼즐판 완성
      case 3: // 게임방 생성
        return (
          <button
            onClick={() => {
              nav(`/game/${item.boardId}`);
              setIsRead(true);
            }}
          >
            퍼즐 게임 하러가기
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="notification-item">
      <div className="notification-item-img">
        <img src={item.imgUrl} alt="프로필 이미지" />
      </div>
      <div className="notification-item-isRead">
        <div className={isRead ? "read-indicator" : "unread-indicator"}></div>
      </div>
      <div className="notification-item-content">{getContent()}</div>
      <div className="notification-item-date">{item.createdDate}</div>
      <div className="notification-item-buttons">{getButton()}</div>
    </div>
  );
};

export default NotificationItem;
