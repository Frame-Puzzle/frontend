// https://docs.openvidu.io/en/stable/advanced-features/speech-detection/ 문서 참고
// https://docs.openvidu.io/en/stable/api/openvidu-browser/classes/Session.html#subscribe
// ov-audio-wave 가져오기
// 발언에 대한 이벤트 처리 함수
// startSpeaking
// stopSpeaking

// 발언 진행자, 발언자들
export const detectVoice = (publisher, setUsers, usersRef) => {
  // user의 말하기 상태를 저장
  // connection : speaking을 시작한 connectionId와 userId 매칭

  // 발언 시작 이벤트로 true로 isSpeaking 설정
  const handleStartSpeaking = (event) => {
    setUsers((users) => {
      const updateSayUsers = users.map((user) =>
        user.id === event.connection.connectionId
          ? { ...user, isSpeaking: true }
          : user
      );
      usersRef.current = updateSayUsers;
      return updateSayUsers;
    });
  };

  // 발언 중지 이벤트 false로 isSpeaking 설정
  const handleStopSpeaking = (event) => {
    setUsers((users) => {
      const updateUnSayUsers = users.map((user) =>
        user.id === event.connection.connectionId
          ? { ...user, isSpeaking: false }
          : user
      );
      usersRef.current = updateUnSayUsers;
      return updateUnSayUsers;
    });
  };

  if (publisher) {
    publisher.on("publisherStartSpeaking", handleStartSpeaking);
    publisher.on("publisherStopSpeaking", handleStopSpeaking);
  }
};
