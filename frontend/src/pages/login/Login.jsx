import "./Login.css";
import KakaoLoginButton from "../../components/login/KakaoLoginButton";
import GoogleLoginButton from "../../components/login/GoogleLoginButton";

const Login = () => {
  return (
    <div className="w-full h-full">
      <div className="main-content">
        <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/frazzle-puzzle.png" alt="frazzle-puzzle" />
        <span className="oneline">
          <span className="bold">퍼즐 조각</span>에
        </span>
        <span className="oneline">
          <span className="bold">추억</span>을 저장해 보세요.
        </span>
      </div>
      <div className="button-content">
        <KakaoLoginButton />
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Login;
