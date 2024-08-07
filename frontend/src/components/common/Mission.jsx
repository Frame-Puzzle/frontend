import "./Mission.css";

const Mission = (props) => {
  return (
    <div className="mission flex">
      <span>{props.info}</span>
      <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/reload-icon.png" alt="reload-icon" />
    </div>
  )
}

export default Mission;