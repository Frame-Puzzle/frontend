import KakaoLoginComponent from "../components/KakaoLoginComponent";
import MainNav from "../components/common/MainNav";
import "./Home.css";

const Home = () => {
  return (
    // Page 단위의 Component의 최상위 요소에는 반드시 width: 100%와 height: 100% 속성이 필요하다.
    <div className="w-full h-full flex flex-wrap">
      <div className="home-main-content">
        <KakaoLoginComponent />
      </div>
      <div className="home-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default Home;
