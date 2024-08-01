import { useNavigate } from "react-router-dom";
import AlarmIcon from "../../assets/icon/nav-alarmBell.svg";
import HomeIcon from "../../assets/icon/nav-home.svg";
import MyPageIcon from "../../assets/icon/nav-mypage.svg";
import "./MainNav.css";

const MainNav = () => {
  const nav = useNavigate();

  return (
    <footer className="footer">
      <div className="nav-item" onClick={() => nav("/notification")}>
        <div className="icon-container">
          <img src={AlarmIcon} alt="Notification" className="icon" />
        </div>
        <div className="footer-element">알림</div>
      </div>
      <div className="nav-item" onClick={() => nav("/home")}>
        <div className="icon-container">
          <img src={HomeIcon} alt="Home" className="icon" />
        </div>
        <div className="footer-element">홈</div>
      </div>
      <div className="nav-item" onClick={() => nav("/mypage")}>
        <div className="icon-container">
          <img src={MyPageIcon} alt="MyPage" className="icon" />
        </div>
        <div className="footer-element">마이페이지</div>
      </div>
    </footer>
  );
};

export default MainNav;
