import { useEffect, useState } from "react";
import "./CompletedBoard.css";
import boardApi from "../apis/boardApi";
import userApi from "../apis/userApi";
import MainHeader from "../components/common/MainHeader";
import MainNav from "../components/common/MainNav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DirectoryCanvasCopy from "../components/directory/DirectoryCanvasCopy";

const CompletedBoard = ({ boardID }) => {

  let directoryId = useSelector(state => state.createBoard.directoryId);
  let navigate = useNavigate();

  // 넘겨받은 boardID를 이용해서 화면에 보여줄 정보를 State로 저장 (접속한 유저 정보도 포함)
  let [keyword, setKeyword] = useState([]);
  let [category, setCategory] = useState('');
  let [directoryName, setDirectoryName] = useState('');
  let [boardNum, setBoardNum] = useState('');
  let [boardSize, setBoardSize] = useState('');
  let [thumbnailer, setThumbnailer] = useState('');
  let [boardClearType, setBoardClearType] = useState('');
  let [userNickname, setUserNickname] = useState('');
  // 썸네일 아이콘 클릭 시 모달창 띄우는 스위치
  let [thumbnailModal, setThumbnailModal] = useState(false);

  // 넘겨받은 boardID를 이용해서 화면에 보여줄 정보를 State로 저장 (접속한 유저 정보도 포함)
  const setInfo = async (boardID) => {
    try {
      const response = await boardApi.get(`/${boardID}`);
      const userResponse = await userApi.get();

      // Test
      console.log(response);
      console.log(userResponse);

      const keyword = response.data.data.keyword;
      setKeyword(keyword);
      const category = response.data.data.category;
      setCategory(category);
      const directoryName = response.data.data.directoryName;
      setDirectoryName(directoryName);
      const boardNum = response.data.data.boardNum;
      setBoardNum(boardNum);
      const boardSize = response.data.data.boardSize;
      setBoardSize(boardSize);
      const thumbnailer = response.data.data.thumbnailer;
      setThumbnailer(thumbnailer);
      const boardClearType = response.data.data.boardClearType;
      setBoardClearType(boardClearType);
      const nickname = userResponse.data.data.nickname;
      setUserNickname(nickname);

    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };

  // 넘겨받은 boardID를 이용해서 화면에 보여줄 정보를 State로 저장 (접속한 유저 정보도 포함)
  useEffect(() => {
    setInfo(boardID);
  }, []);

  return (
    <div className="completed-board w-full h-full relative">
      { thumbnailModal ? <></> : null }
      <div className="completed-board-header">
        <MainHeader
          path={`/directories/${directoryId}`}
          title={`${directoryName} #${boardNum}`}
          category={category}
          icon={
            <img
              src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/trash.png"
              alt="trashIcon"
              className="header-icon"
              style={{ width: "40%", marginLeft: "7vw" }}
            />
          }
        />
      </div>
      <div className="completed-board-body">
        <div className="completed-board-body-top">
          {keyword ?
            <div className="completed-board-body-top-keyword-container">
              {
                keyword.map((each, index) => {
                  return (
                    <div key={index} className="completed-board-body-top-keyword-item">
                      #{each}
                    </div>
                  )
                })
              }
            </div> : null}
          <div className={keyword ? "completed-board-body-top-title-with-keyword-item" : "completed-board-body-top-title-without-keyword-item"}>
            <span>{directoryName} 디렉토리의</span>
            <span>{boardNum}번째 퍼즐판이</span>
            <span>완성되었어요!</span>
          </div>
        </div>
        <div className="completed-board-body-bottom">
          <div className="completed-board-body-bottom-feature-container">
            {userNickname == thumbnailer ?
              <div className="completed-board-body-bottom-icon-container" onClick={(e) => {
                e.stopPropagation();
                setThumbnailModal(true);
              }}>
                <span>썸네일</span>
                <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/thumbnail.gif" />
              </div> : null}
            <div className="completed-board-body-bottom-icon-container" onClick={(e) => {
              e.stopPropagation();
              navigate(`/photo-frame/${boardID}`);
            }}>
              <span>네컷사진</span>
              <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/four-cut.gif" />
            </div>
            <div className="completed-board-body-bottom-icon-container" onClick={(e) => {
              e.stopPropagation();
              navigate(`/album/${boardID}`);
            }}>
              <span>앨범</span>
              <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/album.gif" />
            </div>
          </div>
          <div className="completed-board-body-bottom-canvas-container">
            {/* 퍼즐판 캔버스 삽입 */}
            <DirectoryCanvasCopy boardSize={boardSize} />
          </div>
        </div>
      </div>
      <div className="completed-board-footer">
        <MainNav />
      </div>
    </div>
  )
}

export default CompletedBoard;