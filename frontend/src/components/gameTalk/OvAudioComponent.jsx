// https://github.com/OpenVidu/openvidu-call-react/blob/master/openvidu-call-react/src/components/stream/OvVideo.js
// addVideoElement를 사용하는 openvidu, addAudioElement는 함수로 따로 존재하지 않고,
// video가 audio를 포용
import React, { Component } from "react";

export default class OvAudioComponent extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && Boolean(this.audioRef)) {
      this.props.streamManager.addVideoElement(this.audioRef.current);
    }
  }

  componentDidMount() {
    if (this.props && Boolean(this.audioRef)) {
      this.props.streamManager.addVideoElement(this.audioRef.current);
    }
  }

  render() {
    return <audio autoPlay={true} ref={this.audioRef} controls={true} />;
  }
}
