import firebase from "./firebase";
import "firebase/messaging";

// message 형식 사용하기 코드
const messaging = firebase.messaging();

messaging.requestPermission();
// 토큰요청
//YOUR_PUBLIC_VAPID_KEY: 푸시 알림을 위한 공개 키로, Firebase 콘솔의 클라우드 메시징 탭에서 확인할 수 있습니다.
messaging
  .getToken({
    vapidkey: import.meta.env.VITE_FIREBASE_PUBLIC_KEY,
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log("FCM Token: ", currentToken);
      return currentToken;
    } else {
      console.log("이용가능한 토큰 없음");
      return null;
    }
  })
  .catch((err) => {
    console.log("error: ", err);
    return null;
  });

export const displayNotification = (title, body) => {
  if ("serviceWorker" in navigator && Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        body,
        icon: "/icon.png", // 알림 아이콘 경로
      });
    });
  }
};

export { messaging };
