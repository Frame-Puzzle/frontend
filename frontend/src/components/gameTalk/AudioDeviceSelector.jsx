import React, { useEffect, useState } from "react";

const AudioDeviceSelector = ({ selectedAudio, setSelectedAudio }) => {
  // 내 오디오 장치
  const [audioDevices, setAudioDevices] = useState([]);

  useEffect(() => {
    // 내 디바이스 내에서 사용할 수 있는 오디오 출력장치 리스트 뽑아오기
    const fetchAudioDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputDevices = devices.filter(
        (device) => device.kind === "audioinput"
      );
      setAudioDevices(audioInputDevices);
      if (audioInputDevices.length > 0) {
        setSelectedAudio(audioInputDevices[0].deviceId);
      }
    };

    fetchAudioDevices();
  }, [setSelectedAudio]);

  return (
    <div>
      <label htmlFor="audioSource">Select Microphone: </label>
      <select
        id="audioSource"
        value={selectedAudio}
        onChange={(e) => setSelectedAudio(e.target.value)}
      >
        {audioDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AudioDeviceSelector;
