import KakaoLoginButton from "../../components/login/KakaoLoginButton";
import GoogleLoginButton from "../../components/login/GoogleLoginButton";


const Login = () => {
  return (
    <div className="w-full h-full">
      <GoogleLoginButton />
      <KakaoLoginButton />
    </div>
  );
};

export default Login;
