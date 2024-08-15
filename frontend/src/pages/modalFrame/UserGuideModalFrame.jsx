import "./UserGuideModalFrame.css";
import GuideSwipe from "../../components/modal/guide/GuideSwipe";

const UserGuideModalFrame = ({ setInfoModal }) => {
  // guides 1~17-4x png
  const imgList = [];
  for (let i = 1; i <= 17; i++) {
    imgList.push(
      `https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/guides${i}-4x.png`
    );
  }
  return (
    <div
      className="user-guide-modal flex justify-content-center align-items-center"
      onClick={(e) => {
        e.stopPropagation();
        setInfoModal(false);
      }}
    >
      <GuideSwipe images={imgList} />
    </div>
  );
};

export default UserGuideModalFrame;
