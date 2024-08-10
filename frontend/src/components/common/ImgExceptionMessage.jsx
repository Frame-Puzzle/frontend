import "./ImgExceptionMessage.css";

const ImgExceptionMessage = ({ exceptionMessage }) => {

  if (exceptionMessage === 0) {
    return (<span className="img-exception-message">공백 포함 20자 이내로 작성해주세요.</span>);
  } else if (exceptionMessage === 1) {
    return (<span className="img-exception-message" style={{color: "#27C28A"}}>올바른 형식입니다.</span>)
  } else {
    return (<span className="img-exception-message">길이가 너무 깁니다.</span>)
  }

}

export default ImgExceptionMessage;