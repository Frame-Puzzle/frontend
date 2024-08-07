import MainHeader from "../../components/common/MainHeader";
import MainNav from "../../components/common/MainNav";
import { Routes, Route, Router, Outlet } from "react-router-dom";
import "./CreateBoard.css";

const CreateBoard = () => {
  return (
    <div className="create-board w-full h-full">
      <div className="create-board-header"> {/* 헤더 높이 10% */}
        <MainHeader title={`Puzzle Board Option`} />
      </div>
      <div className="create-board-body">
        {/* 변화하는 부분 */}
        <Outlet></Outlet>
      </div>
      <div className="create-board-footer"> {/* 네비게이션 바 높이 10% */}
        <MainNav />
      </div>
    </div>
  )
}

export default CreateBoard;