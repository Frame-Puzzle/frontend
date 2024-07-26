import React, { useEffect } from "react";

const KakaoLoginButton = () => {
  useEffect(() => {
    // 카카오 SDK 초기화
    window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY); // 카카오 앱 키 입력
  }, []);

  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        const accessToken = authObj.access_token;

        console.log("accessToken", accessToken);
        // 서버로 액세스 토큰 전송
        fetch("/api/auth/kakao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: accessToken }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("로그인 실패");
          })
          .then((data) => {
            console.log("로그인 성공:", data);
            // 추가적인 사용자 처리 로직
          })
          .catch((error) => {
            console.error("오류 발생:", error);
          });
      },
      fail: function (err) {
        console.error("로그인 실패:", err);
      },
    });
  };

  return (
    <div className="w-full">
      <button onClick={loginWithKakao}>카카오로 로그인</button>
    </div>
  );
};

export default KakaoLoginButton;
