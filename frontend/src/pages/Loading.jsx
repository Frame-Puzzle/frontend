import "./Loading.css";

const Loading = () => {
  return (
    <div className="background-loading">
      <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/frazzle-logo.png" alt="frazzle logo" />
      <img style={{width: "10vw"}} src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/spinner.gif" alt="spinner" />
    </div>
  )
}

export default Loading;