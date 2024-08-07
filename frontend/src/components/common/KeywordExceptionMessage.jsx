import "./KeywordExceptionMessage.css";

const KeywordExceptionMessage = (props) => {
  
  if (props.exceptionMessage === 0) {
    return null;
  } else if (props.exceptionMessage === 1) {
    return (<span className="keyword-exception-message-red">한글과 숫자 합쳐서 공백없이 6자 이내를 입력해 주세요.</span>)
  } else if (props.exceptionMessage === 2) {
    return (<span className="keyword-exception-message-red">이미 기입한 키워드입니다.</span>)
  } else if (props.exceptionMessage === 3) {
    return (<span className="keyword-exception-message-green">입력 가능한 키워드입니다.</span>)
  }

}

export default KeywordExceptionMessage;