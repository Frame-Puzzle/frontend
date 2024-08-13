import DeleteBoard from "../../components/modal/board/DeleteBoard";
import "./BoardDeleteModalFrame.css";

const BoardDeleteModalFrame = ({ setDeleteModal }) => {
  return (
    <div className="board-delete-modal flex justify-content-center align-items-center">
      <DeleteBoard setDeleteModal={setDeleteModal} />
    </div>
  )
}

export default BoardDeleteModalFrame;