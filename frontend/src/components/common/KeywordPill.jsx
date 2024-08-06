import "./KeywordPill.css";

const KeywordPill = (props) => {
  return (
    <div className="keyword-pill flex">
      <span>#{props.info}</span>
      <div className="x-icon-container">
        <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/x-symbol.png" alt="x-icon" />
      </div>
    </div>
  )
}

export default KeywordPill;