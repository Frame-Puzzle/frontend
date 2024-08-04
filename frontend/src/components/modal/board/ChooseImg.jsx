import react, { useState, useRef, useEffect } from "react";
import paper from "paper";
import { setTileId } from "../../../stores/tileSlice";
import "./ChooseImg.css";
import { useSelector, useDispatch } from "react-redux";

const ChooseImg = ({ setModal }) => {
  const canvasRef = useRef(null);
  const tile = useSelector((state) => state.tile);
  const dispatch = useDispatch();

  useEffect(() => {
    paper.setup(canvasRef.current);

    /*const drawTile = tile.clone();

    drawTile.position = new paper.Point(200, 200);
    drawTile.strokeColor = new paper.Color(0, 0, 0);
    drawTile.fillColor = new paper.Color(1, 1, 1);
    drawTile.opacity = 1;

    return () => {
      if (drawTile) {
        drawTile.remove();
      }
    };*/
    return () => {};
  }, []);

  return (
    <div className="create-board-modal">
      <div className="create-board-modal-header flex">
        <img
          src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/x-symbol.png"
          alt="x-symbol"
          className="x-symbol"
          onClick={() => {
            dispatch(setTileId(0));
          }}
        />
      </div>
      <div className="create-choose-img-modal-body">
        <div className="choose-img-container ">
          <img
            className="choose-img"
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/edit-image-photo.png"
            alt="edit-image-photo"
          />
          <span>Upload Photos</span>
        </div>
        <div className="image-description">
          <span>덧붙이고 싶은 설명을 적어주세요.</span>
          <input type="text" />
        </div>
      </div>

      <div className="choose-img-buttons">
        <button>등록</button>
      </div>
    </div>
  );
};

export default ChooseImg;
