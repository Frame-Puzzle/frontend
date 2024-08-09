import React from "react";

const CreateWaitingRoom = ({ setModal }) => {
  return (
    <>
      <div className="create-waiting-modal">
        <div className="create-waiting-modal-header flex">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/x-symbol.png"
            alt="x-symbol"
            className="x-symbol"
            onClick={() => setModal(0)}
          />
        </div>
      </div>
    </>
  );
};

export default CreateWaitingRoom;
