import { useEffect } from "react";
import "./LoadingModal.css";
import { useNavigate } from "react-router-dom";

const LoadingModal = () => {

  return (
    <div className="loading-modal-frame absolute">
      <span>잠시만 기다려주세요</span>
      <img style={{ width: "10vw" }} src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/spinner.gif" alt="spinner" />
    </div>
  )
}

export default LoadingModal;