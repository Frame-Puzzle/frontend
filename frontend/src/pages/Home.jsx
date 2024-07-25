import KakaoLoginComponent from "../components/KakaoLoginComponent";
import MainNav from "../components/common/MainNav";
import style from "./Home.module.css";
import { LoginButton1, LoginButton2 } from "./Login";

const Home = () => {
  return (
    <div className="w-full h-full">
      <KakaoLoginComponent />
      <footer>
        <MainNav />
      </footer>
    </div>
  );
};

export default Home;
