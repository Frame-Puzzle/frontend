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
  // url Parameter 이름과 동일하게 'id'를 사용해야 한다.
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <div className="w-full h-full flex flex-wrap relative">
      {/* {modal ? <BoardModalFrame /> : null} */}
      <div className="directory-header">
        <MainHeader
          title={directoryName}
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

        {boardList.length > 0 ? (
          <Slider {...settings}>
            {boardList.map((board, index) => (
              <div key={index}>
                <DirectoryCanvas boardSize={board.boardSize} />
              </div>
            ))}
          </Slider>
        ) : null}
      </div>

      <div className="directory-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default Directory;
