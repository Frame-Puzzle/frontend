import "./DirectoryModalFrame.css";
import InviteDirectory from "../../components/modal/directory/InviteDirectory";
import UpdateDirectory from "../../components/modal/directory/UpdateDirectory";
import LeaveDirectory from "../../components/modal/directory/LeaveDirectory";

import { useDispatch, useSelector } from "react-redux";

const DirectoryModalFrame = () => {
  const dispatch = useDispatch();
  const directory = useSelector((state) => state.directory);

  return (
    <div className="directory-modal-frame flex justify-content-center align-items-center">
      {directory.modalId === 1 ? <InviteDirectory /> : null}
      {directory.modalId === 2 ? <UpdateDirectory /> : null}
      {directory.modalId === 3 ? <LeaveDirectory /> : null}
    </div>
  );
};

export default DirectoryModalFrame;
