import { useEffect } from "react";
import "./MainHeader.css";
import { useNavigate } from "react-router-dom";
import { setModalId } from "../../stores/directorySlice";
import { useDispatch } from "react-redux";
import { setModalBoardId } from "../../stores/boardSlice";

// 3요소: 해당 페이지 이름, 해당 페이지 카테고리, 아이콘 (없을 수도 있음)
const MainHeader = ({
  title,
  category,
  icon,
  directoryName,
  page,
  path = -1, // 기본값을 -1로 설정
  timer,
  downloadPhotoFrame,
}) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (downloadPhotoFrame) {
      console.log("downloadPhotoFrame function is present");
    } else {
      console.log("downloadPhotoFrame function is missing");
    }
  }, [downloadPhotoFrame]);

  return (
    <div className="header flex">
      <div className="header-left flex align-items-center">
        {" "}
        {/* 85% */}
        <div
          className="header-prev flex justify-content-center align-items-center"
          onClick={() => nav(path)}
        >
          <div>&lt;</div>
        </div>
        <div className="header-title">{title}</div>
        {/* 조건부 렌더링, category를 넣어주면 category가 나오도록 설계 */}
        {category && <div className="header-category">{category}</div>}
      </div>
      {/* 조건부 렌더링, icon을 넣어주면 icon이 나오도록 설계 */} {/* 15% */}
      {/* {icon}에 들어가는 <img> 태그의 클래스에다가 width: 20%처럼 적절한 크기를 지정해주어야 한다. */}
      <div className="header-icon flex justify-content-center align-items-center">
        {page === "디렉토리" && icon ? (
          <div onClick={() => dispatch(setModalId(2))}>{icon}</div>
        ) : null}
        {page === "퍼즐판" && icon ? (
          <div onClick={() => dispatch(setModalBoardId(4))}>{icon}</div>
        ) : null}
        {page === "포토프레임" && icon ? (
          <div onClick={() => downloadPhotoFrame()} style={{ zIndex: 1000 }}>
            {icon}
          </div>
        ) : null}
        {!page && icon && <div>{icon}</div>}
        {directoryName && <span>[{directoryName}]</span>}
        {timer && <span>{timer}</span>}
      </div>
    </div>
  );
};

export default MainHeader;
