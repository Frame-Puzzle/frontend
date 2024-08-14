import "./Album.css";
import MainHeader from "../components/common/MainHeader";
import ImageSwipe from "../components/frame/ImageSwipe";
import { useEffect, useState } from "react";
import boardApi from "../apis/boardApi";
import { useParams } from "react-router-dom";

const Album = () => {
  const [imgList, setImgList] = useState([]);

  const [boardName, setBoardName] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState([]);

  const { boardID } = useParams();

  useEffect(() => {
    const fetchAllImages = async () => {
      const response = await boardApi.get(`/${boardID}/images`);
      const data = response.data.data;

      console.log(data);
      setImgList(data.imgList);
    };

    fetchAllImages();

    const fetchPuzzleData = async () => {
      const response = await boardApi.get(`/${boardID}`);

      const data = response.data.data;

      // 퍼즐판 정보 세팅
      setBoardName(data.directoryName + "#" + data.boardNum);
      setCategory(data.category);
      if (data.keyword) {
        setKeywords(data.keyword);
      }
    };

    fetchPuzzleData();
  }, []);
  return (
    <div className="w-full h-full flex flex-wrap relative">
      <div className="album-header">
        <MainHeader title={"Album"} />
      </div>
      <div className="album-body">
        <div className="album-detail">
          <div className="album-board-name">{boardName}</div>
          <div className="album-board-category-container">
            <span className="album-board-category">{category}</span>
          </div>
          <div className="album-board-keywords">
            {keywords.map((keyword, index) => (
              <div key={index} className="album-board-keyword">
                #{keyword}
              </div>
            ))}
          </div>
        </div>
        <div className="album-image-swipe">
          <ImageSwipe images={imgList} />
        </div>
      </div>
    </div>
  );
};

export default Album;
