import react, { useState, useRef, useEffect } from "react";
import paper from "paper";
import "./ChooseImg.css";

const ChooseImg = ({ data, onClose }) => {
  const canvasRef = useRef(null);
  const { tile, tileWidth } = data;

  useEffect(() => {
    paper.setup(canvasRef.current);

    const drawTile = tile.clone();

    drawTile.position = new paper.Point(200, 200);
    drawTile.strokeColor = new paper.Color(0, 0, 0);
    drawTile.fillColor = new paper.Color(1, 1, 1);
    drawTile.opacity = 1;
    console.log(drawTile);

    return () => {
      if (drawTile) {
        drawTile.remove();
      }
    };
  }, [tile]);
  return (
    <div className="modal-overlay">
      <div style={{ background: "white" }}>
        <canvas ref={canvasRef} width={tileWidth} height={tileWidth}></canvas>
      </div>
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
      </div> 
    </div>
  );
};

export default ChooseImg;
