import MainHeader from "../../components/common/MainHeader";
import MainNav from "../../components/common/MainNav";
import { Routes, Route, Router, Outlet } from "react-router-dom";
import "./CreateBoard.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingModal from "../LoadingModal";

const CreateBoard = () => {

  // 가장 마지막으로 접속한 디렉토리 상세페이지 정보 가져오기
  let directoryId = useSelector(state => state.createBoard.directoryId);

  let gptLoading = useSelector(state => state.loading.gptLoading);

  return (
    <div className="create-board w-full h-full relative">
      { gptLoading ? <LoadingModal /> : null }
      <div className="create-board-header"> {/* 헤더 높이 10% */}
        <MainHeader title={`Puzzle Board Option`} path={`/directories/${directoryId}`} />
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