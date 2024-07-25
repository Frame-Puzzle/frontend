import KakaoLoginButton from "../components/login/KakaoLoginButton";
import MainNav from "../components/common/MainNav";
import GoogleLoginButton from "../components/login/GoogleLoginButton";


const Home = () => {
  return (
    <div className="w-full h-full">
      <KakaoLoginButton />
      <GoogleLoginButton />
      <footer>
        <MainNav />
      </footer>
    </div>
  );
};

export default Home;
