import react, { useState, useRef, useEffect } from "react";
import paper from "paper";
import "./ChooseImg.css";

const ChooseImg = ({ setModal, modalData }) => {
  const canvasRef = useRef(null);
  const { tile, tileWidth } = modalData;

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
  }, [tile]);

  return (
    <div className="create-board-modal">
      <div className="create-board-modal-header flex">
        <img
          src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/x-symbol.png"
          alt="x-symbol"
          className="x-symbol"
          onClick={() => {
            setModal(false);
          }}
        />
      </div>
      <div>
        아아아아아
      </div>
    </div>
  );
};

export default ChooseImg;
