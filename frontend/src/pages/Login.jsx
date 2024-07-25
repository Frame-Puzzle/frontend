import KakaoLoginButton from "../components/login/KakaoLoginButton";
import GoogleLoginButton from "../components/login/GoogleLoginButton";


const Login = () => {
  return (
    <div className="w-full h-full">
      <KakaoLoginButton />
      <GoogleLoginButton />
    </div>
  );
};

export default Login;
