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

// 대전제: 수락 여부가 0인 경우면 버튼이 필요한 경우!
// 추가: acceptStatus가 3이면 type 0, type 1은 버튼말고 text로 존재하지 않는 초대, 요청입니다. 가 띄워져야 함
const NotificationItem = ({ item }) => {
  const nav = useNavigate();
  const [read, setRead] = useState(item.isRead); // 버튼 눌렀을 때 읽음 바로 확인해주기 위해
  const [showButtons, setShowButtons] = useState(true);

  // 날짜 형식을 "2024년 8월 7일 시간까지"로 변환하는 함수

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  };

  // 빨간 점 표시
  useEffect(() => {
    setRead(item.isRead);
    // 버튼이 안보이는 경우: type 2,3은 항상 보임
    // acceptStatus가 0이 아닌 경우!(type 0, 1)에만 해당하는 버튼 숨기기
    if (item.acceptStatus === 3) {
      setRead(true); // 3번인 경우 내가 읽지 않았더라도 이미 삭제나, 초대 취소가 됐다면 읽음 표시 진행!(예외 사항)
    }

    if (item.acceptStatus !== 0) {
      setShowButtons(false);
    }
  }, [item]);

  const handleAcceptedToggle = async (acceptValue) => {
    try {
      await NotificationApi.put(`/${item.notificationId}`, {
        notificationId: item.notificationId,
        read: true,
        accept: acceptValue,
      });
      setRead(true);
      setShowButtons(false);
    } catch (error) {
      console.error("알림 업데이트 실패", error);
    }
  };

  const getContent = () => {
    switch (item.type) {
      case 0: // 유저 초대
        return (
          <>
            <b>{item.createUserName}</b>님이 <b>{item.category}</b> 모임{" "}
            <b>[{item.directoryName}]</b>에 초대를 보냈습니다
          </>
        );
      case 1: // 퍼즐판 board 삭제 투표
        return (
          <>
            <b>{item.createUserName}</b>님이 <b>{item.category}</b> 모임{" "}
            <b>{item.directoryName}</b> <b>#{item.boardNum}</b> 삭제 투표를
            시작했어요!
          </>
        );
      case 2: // 퍼즐판 완성
        return (
          <>
            <b>{item.createUserName}</b>님의 <b>{item.category}</b> 모임{" "}
            <b>{item.directoryName}</b>
            <b>#{item.boardNum}</b> 퍼즐 조각이 모두 모였어요!
          </>
        );
      case 3: // 게임방 생성
        return (
          <>
            <b>{item.createUserName}</b>님이 <b>{item.category}</b> 모임{" "}
            <b>{item.directoryName}</b>
            <b>#{item.boardNum}</b> 퍼즐 게임을 시작했습니다
          </>
        );
      default:
        return "알 수 없는 알림 유형입니다.";
    }
  };

  const getButton = () => {
    if (item.acceptStatus === 3) {
      // acceptStatus 먼저 처리하게 설정
      return (
        <div className="notification-noAction">
          {item.type === 0 && "존재하지 않는 초대입니다"}
          {item.type === 1 && "삭제 투표가 종료되었습니다."}
        </div>
      );
    } else if (!showButtons) {
      return null;
    }
    switch (item.type) {
      case 0: // 유저 초대
        return (
          <>
            <span
              onClick={() => {
                handleAcceptedToggle(1);
                setShowButtons(false);
              }}
              className="notification-positive"
            >
              참여
            </span>
            <span
              onClick={() => {
                handleAcceptedToggle(2);
                setShowButtons(false);
              }}
              className="notification-negative"
            >
              거절
            </span>
          </>
        );
      case 1: // 퍼즐판 board 삭제 투표
        return (
          <>
            <span
              onClick={() => {
                handleAcceptedToggle(1);
                setShowButtons(false);
              }}
              className="notification-positive"
            >
              수락
            </span>
            <span
              onClick={() => {
                handleAcceptedToggle(2);
                setShowButtons(false);
              }}
              className="notification-negative"
            >
              거절
            </span>
          </>
        );
      case 2: // 퍼즐판 완성
      case 3: // 게임방 생성
        return (
          <span
            className="notification-into-puzzle"
            onClick={() => {
              nav(`/boards/${item.boardId}`);
              setRead(true);
            }}
          >
            퍼즐 게임 하러가기
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="notification-item">
      <div className="notification-item-img">
        <img
          src={item.profileImg}
          alt="프로필 이미지"
          className="notification-profile-img"
        />
      </div>
      <div className="notification-container">
        <div className="notification-item-header">
          <div className="notification-item-date">
            {formatDate(item.createTime)}
          </div>
          <div className="read-indicator">
            {!read && (
              <img
                src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/red-dot.png"
                alt="Red Dot"
              />
            )}
          </div>
        </div>
        <div className="notification-item-content">{getContent()}</div>
        <div className="notification-item-button-align">{getButton()}</div>
      </div>
    </div>
  );
};

export default NotificationItem;
