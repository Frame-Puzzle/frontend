import "./MainHeader.css";
import { useNavigate } from "react-router-dom";

// 3요소: 해당 페이지 이름, 해당 페이지 카테고리, 아이콘 (없을 수도 있음)
const MainHeader = ({ title, category, icon, directoryName }) => {
  const nav = useNavigate();
  return (
    <div className="header flex">
      <div className="header-left flex align-items-center">
        {" "}
        {/* 85% */}
        <div
          className="header-prev flex justify-content-center align-items-center"
          onClick={() => nav(-1)}
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
        {icon && <div>{icon}</div>}
        {directoryName && <span>[{directoryName}]</span>}
      </div>
    </div>
  );
};

export default MainHeader;
