import "./CreateDirectory.css";

const CreateDirectory = () => {
  return (
    <div className="create-directory-modal flex">
      <div className="create-directory-modal-header flex">
        <img src="/img/folder.png" alt="folder-icon" className="folder-icon" />
        <span className="create-directory-modal-title">디렉토리 만들기</span>
        <img src="/img/x-symbol.png" alt="x-symbol" className="x-symbol" />
      </div>
    </div>
  )
}

export default CreateDirectory;