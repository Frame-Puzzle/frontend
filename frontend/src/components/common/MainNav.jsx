import { useNavigate } from "react-router-dom";
import "./MainNav.css";

const MainNav = () => {
  const nav = useNavigate();

  return (
    <div className="footer flex justify-content-center align-items-center">
      <div className="nav-item" onClick={() => nav("/notification")}>
        <div className="icon-container">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/nav-alarmBell.png"
            alt="Notification"
            className="icon"
          />
        </div>
        <div className="footer-element">알림</div>
      </div>
      <div className="nav-item" onClick={() => nav("/home")}>
        <div className="icon-container">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/nav-home.png"
            alt="Home"
            className="icon"
          />
        </div>
        <div className="footer-element">홈</div>
      </div>
      <div className="nav-item" onClick={() => nav("/mypage")}>
        <div className="icon-container">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/nav-mypage.png"
            alt="MyPage"
            className="icon"
          />
        </div>
        <div className="footer-element">마이페이지</div>
      </div>
    </div>
  );
};

export default MainNav;
