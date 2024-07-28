/*eslint-diable*/
import MainNav from "../components/common/MainNav";
import MainSwipe from "./../components/common/MainSwipe";
import "./Home.css";

const Home = () => {
  return (
    // Page 단위의 Component의 최상위 요소에는 반드시 width: 100%와 height: 100% 속성이 필요하다.*/
    <div className="w-full h-full flex flex-wrap">
      <div className="home-main-content bg-color1">
        <div className="top-title">HOME</div>
        <div className="user-info">
          <p>안녕하세요</p>
          <p>꽃든포차코님</p>
        </div>
        <div>
          <MainSwipe />
        </div>
        <div></div>
        <div></div>
      </div>
      <div className="home-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default Home;
