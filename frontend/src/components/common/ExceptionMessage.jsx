import "./ExceptionMessage.css";

const ExceptionMessage = (props) => {
  if (props.exceptionMessage === 0) {
    return null;
  } else if (props.exceptionMessage === 1) {
    return (<span className="exception-message">올바르지 않은 형식입니다.</span>);
  } else if (props.exceptionMessage === 2) {
    return (<span className="exception-message">길이가 너무 깁니다.</span>)
  } else {
    return (<span className="exception-message">이 이름은 사용할 수 있습니다.</span>)
  }
}

export default ExceptionMessage;