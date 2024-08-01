import "./Loading.css";

const Loading = () => {
  return (
    <div className="background-loading">
      <img src="/img/frazzle-logo.png" alt="frazzle logo" />
      <img style={{width: "10vw"}} src="/img/spinner.gif" alt="spinner" />
    </div>
  )
}

export default Loading;