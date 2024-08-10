import "./ImgExceptionMessage.css";

const ImgExceptionMessage = ({ exceptionMessage }) => {

  if (exceptionMessage === 0) {
    return (<span>공백 포함 20자 이내로 작성해주세요.</span>);
  } else if (exceptionMessage === 1) {
    return (<span>올바른 형식입니다.</span>)
  } else {
    return (<span>길이가 너무 깁니다.</span>)
  }
  
}

export default ImgExceptionMessage;