import { useNavigate, useParams } from "react-router-dom";
import MainNav from "../../components/common/MainNav";
import MainHeader from "../../components/common/MainHeader";
import MemberHeader from "../../components/directory/MemberHeader";
import "./Directory.css";
import { useEffect, useState } from "react";
import directoryApi from "../../apis/directoryApi";
import DirectoryCanvas from "../../components/directory/DirectoryCanvas";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Directory = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [directoryName, setDirectoryName] = useState("");
  const [category, setCategory] = useState("");
  const [boardList, setBoardList] = useState([]);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const fetchDirectory = async () => {
      const response = await directoryApi.get(`/${id}`);
      const data = response.data.data;

      setDirectoryName(data.directoryName);
      setCategory(data.category);
      setBoardList(data.boardList);
      setMemberList(data.memberList);
    };
    fetchDirectory();
  }, [id]);

  // 슬라이드 설정
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
  };

  // 클릭과 드래그 구분을 위한 상태 변수
  let mouseDownX = 0;
  let mouseUpX = 0;

  const handleMouseDown = (e) => {
    mouseDownX = e.clientX;
  };

  const handleMouseUp = (boardId) => (e) => {
    mouseUpX = e.clientX;
    if (mouseDownX === mouseUpX) {
      // 마우스 다운과 업의 X 좌표가 동일하면 클릭으로 간주
      nav(`/boards/${boardId}`);
    }
  };

  return (
    <div className="w-full h-full flex flex-wrap relative">
      <div className="directory-header">
        <MainHeader
          title={directoryName}
          icon={
            <img
              src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/edit.png"
              alt="thirdIcon"
              className="header-icon"
              style={{ width: "38%", marginLeft: "7vw" }}
            />
          }
          category={category}
        />
      </div>
      <div className="directory-main-content">
        <div className="directory-member-header">
          <MemberHeader
            memberList={memberList}
            icon={
              <img
                src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/edit.png"
                alt="thirdIcon"
                className="header-icon"
                style={{ width: "40%" }}
              />
            }
            category={category}
          />
        </div>
        <div
          className="directory-middle-container"
        >
          <div className="directory-create-board">
            <span className="board-plus">퍼즐 추가</span>
            <img
              src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/plus.png"
              alt="board-plus"
              className="board-plus-logo"
            />
          </div>
        </div>
        <div className="directory-slider">
          {boardList.length > 0 ? (
            <Slider {...settings}>
              {boardList.map((board, index) => (
                <div
                  key={index}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp(board.boardId)}
                >
                  <DirectoryCanvas boardSize={board.boardSize} />
                  <div className="direoctory-board-name">
                    {directoryName}#{board.boardName}</div>
                </div>
              ))}
            </Slider>
          ) : null}
        </div>
      </div>

      <div className="directory-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default Directory;
