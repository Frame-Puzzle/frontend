import "./Directory.css";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="directory-icon">
        <img src="" alt="open or close"></img>
      </div>
      <div className="directory-category-box">
        <span className="directory-category">{ /* category data binding */ props.info.category }</span>
      </div>
      <div className="directory-name-box">
        <span className="directory-name">{ /* directory name data binding */ props.info.directoryName }</span>
      </div>
    </div>
  )
}

export default Directory;