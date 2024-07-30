import { useNavigate } from "react-router-dom";
import AlarmIcon from "../../assets/icon/nav-alarmBell.svg";
import HomeIcon from "../../assets/icon/nav-home.svg";
import MyPageIcon from "../../assets/icon/nav-mypage.svg";
import "./MainNav.css";

const MainNav = () => {
  const nav = useNavigate();

  return (
    <footer
      className={`w-full h-full p-10 bg-white shadow flex justify-between items-center bottom-0 left-0`}
    >
      <div
        className="w-[30px] h-[30px] flex flex-col justify-center items-center relative cursor-pointer"
        onClick={() => nav("/notification")}
      >
        <img
          src={AlarmIcon}
          alt="Notification"
          className="w-[27.86px] h-[27.86px]"
        />
        <div
          className={`text-center text-black text-sm font-normal footer-element`}
        >
          알림
        </div>
      </div>
      <div
        className="w-[30px] h-[30px] flex flex-col justify-center items-center relative cursor-pointer"
        onClick={() => nav("/home")}
      >
        <img src={HomeIcon} alt="Home" className="w-[27.86px] h-[27.86px]" />
        <div
          className={`text-center text-black text-sm font-normal footer-element`}
        >
          홈
        </div>
      </div>
      <div
        className="w-[30px] h-[30px] flex flex-col justify-center items-center relative cursor-pointer"
        onClick={() => nav("/mypage")}
      >
        <img
          src={MyPageIcon}
          alt="MyPage"
          className="w-[27.86px] h-[27.86px]"
        />
        <div
          className={`text-center text-black text-sm font-normal whitespace-nowrap footer-element`}
        >
          마이페이지
        </div>
      </div>
    </footer>
  );
};

export default MainNav;
