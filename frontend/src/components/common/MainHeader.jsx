import "./MainHeader.css";
import { useNavigate } from "react-router-dom";

// 3요소: <, 해당 페이지 이름, 해당 페이지 아이콘(없을 수도 있음)
const MainHeader = ({ title, icon }) => {
  const nav = useNavigate();
  return (
    <header className="header">
      <div className="header_prev" onClick={() => nav(-1)}>
        &lt;
      </div>
      <div className="header_title">{title}</div>
      {/* 조건부 렌더링, icon을 넣어주면 icon이 나오도록 설계 */}
      {icon && <div className="header_icon">{icon}</div>}
    </header>
  );
};

export default MainHeader;
