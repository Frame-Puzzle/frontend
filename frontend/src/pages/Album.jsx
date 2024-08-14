import "./Album.css";
import MainHeader from "../components/common/MainHeader";

const Album = () => {
  return (
    <div className="w-full h-full flex flex-wrap relative">
      <div className="board-header">
        <MainHeader
          title={"Album"}
        />
      </div>
    </div>
  );
};

export default Album;
