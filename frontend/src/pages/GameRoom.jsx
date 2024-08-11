import React from "react";
import "./GameRoom.css";
import { useParams } from "react-router-dom";
import GameBoard from "../components/game/GameBoard";

const GameRoom = () => {
  const id = useParams("roomID");

  return (
    <div>
      게임 방 입니다.
      <GameBoard id={id} />
    </div>
  );
};

export default GameRoom;
