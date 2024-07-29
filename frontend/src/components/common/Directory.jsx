import "./Directory.css";

const Directory = () => {
  return (
    <div className="directory">
      <div className="directory-icon">
        <img src="" alt="open or close"></img>
      </div>
      <div className="directory-category-box">
        <span className="directory-category">{/* Need data binding */}</span>
      </div>
      <div className="directory-name-box">
        <span className="directory-name">{/* Need data binding */}</span>
      </div>
    </div>
  )
}

export default Directory;