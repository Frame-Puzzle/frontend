import React, { useEffect } from "react";
import MainHeader from "../components/common/MainHeader";
import { useSelector } from "react-redux";

const WaitingRoom = () => {

  useEffect(() => {

  },[])

  return (
    <>
    <div className="w-full h-full flex flex-wrap relative">
    <div className="waiting-room-header">
        <MainHeader
          title={"PUZZLE"}
          // directoryName={CreateBoard.dire}
        />
      </div>
    </div>
    </>
  )
}

export default WaitingRoom;