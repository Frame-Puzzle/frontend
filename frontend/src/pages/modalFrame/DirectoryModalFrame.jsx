import "./DirectoryModalFrame.css";
import InviteDirectory from "../../components/modal/directory/InviteDirectory";
import { useDispatch, useSelector } from "react-redux";

const DirectoryModalFrame = () => {
  const dispatch = useDispatch();
  const directory = useSelector((state) => state.directory);

  return (
    <div className="directory-modal-frame flex justify-content-center align-items-center">
      {directory.modalId === 1 ? <InviteDirectory /> : null}
    </div>
  );
};

export default DirectoryModalFrame;
