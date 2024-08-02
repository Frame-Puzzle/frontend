import "./Directory.css";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="directory-icon">
        <img src="" alt="open or close"></img>
      </div>
      <div className="directory-category-box">
        <span className="directory-category">{ props.info.category /* category data binding */ }</span>
      </div>
      <div className="directory-name-box">
        <span className="directory-name">{ props.info.directoryName /* Need data binding */ }</span>
      </div>
    </div>
  )
}

export default Directory;