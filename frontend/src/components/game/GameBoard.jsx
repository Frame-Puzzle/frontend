import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, painters, outline } from "headbreaker";
import { useSelector } from "react-redux";
import "./GameBoard.css";

// var piece = {
//   index: null,
//   idX: null,
//   idY: null,
//   group: null,
//   tabs: null,
//   userInfo: null,
//     figure: null,
// };

const GameBoard = ({
  id,
  messages,
  sendMessage,
  isConnected,
  moveData,
  image,
}) => {
  const boardRef = useRef(null);
  const canvasRef = useRef(null);

  const puzzleSize = 4;

  const pieceMapRef = useRef(new Map());
  const puzzleRef = useRef({});

  const activePuzzlePieceRef = useRef(null);

  const user = useSelector((state) => state.user);

  //퍼즐 초기화
  useEffect(() => {
    // 퍼즐 세팅
    //if (isConnected){
    initCanvas(image, puzzleSize, puzzleSize);

    sendMessage(`/pub/start/${id}`, {
      boardId: id,
      start: true,
      size: puzzleSize,
    });
    //}
  });

  useEffect(() => {
    // console.log("이동");
    // console.log(moveData);
    // if (canvasRef.current) {
    //   clickPiece();
    //   movePiece();
    //   //releasePiece();
    // }
  }, [moveData]);

  // useEffect(() => {
  //   console.log("받은 메시지");
  //   console.log(messages);
  // }, [messages])

  const initCanvas = (image, row, col) => {
    console.log("캔버스 생성");

    const gameImg = new Image();
    gameImg.src = image;
    canvasRef.current = new Canvas(id, {
      outline: new outline.Rounded(),
      width: 600,
      height: 500,
      pieceSize: 64,
      borderFill: 10,
      strokeWidth: 2,
      lineSoftness: 0.12,
      painter: new painters.Konva(),
      image: gameImg,
      maxPiecesCount: { x: row, y: col },
      fixed: true,
      preventOffstageDrag: true,
      strokeColor: "#000000",
    });

    // 이미지 높이 맞추기
    canvasRef.current.adjustImagesToPuzzleHeight();

    // 퍼즐 자동 생성
    canvasRef.current.autogenerate({
      horizontalPiecesCount: row,
      verticalPiecesCount: col,
    });

    //사용감지,그룹용으로 사용할 정보
    const initPieces = {};
    let cnt = 0;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        initPieces[cnt] = {
          index: cnt,
          idX: i,
          inY: j,
          group: cnt,
          tabs: null,
          userInfo: null,
          figure: null,
        };
        cnt++;
      }
    }

    //이벤트 리스너 등록하기
    Object.values(canvasRef.current.figures).forEach((figure, piece) => {
      const handleDragStart = (event) => clickPiece(event, piece);
      const handleDragMove = (event) => movePiece(event, piece);
      const handleDragEnd = (event) => releasePiece(event, piece);

      figure.group.on("dragstart", handleDragStart);
      figure.group.on("dragmove", handleDragMove);
      figure.group.on("dragend", handleDragEnd);

      initPieces[piece].figure = figure;
    });

    puzzleRef.current = initPieces;
    //puzzleLibRef.current = canvasRef.current._puzzle_piece;

    // 이미지 그리기
    canvasRef.current.draw();
  };

  //#########핸들러 이벤트

  const clickPiece = (event, piece) => {
    console.log("클릭");

    const currentPiece = puzzleRef.current[piece];
    setActivePuzzlePiece(currentPiece);
    if (currentPiece.userInfo == null) {
      currentPiece.userInfo = user.nickName;
    } else {
      setActivePuzzlePiece(null);
    }
  };

  const releasePiece = (event, piece) => {
    console.log("릴리즈");

    const x = event.target.x();
    const y = event.target.y();

    //console.log(figure);
    console.log(`Piece ${piece} moved to x: ${x}, y: ${y}`);

    //그룹 세팅하기,
    //그룹 체크하고 클리어 여부 판단하기

    //통신 보내기

    if (isConnected) {
      console.log("메시지 보냄");
      sendMessage(`/pub/release/puzzle/${id}`, { index: piece, x: x, y: y });
    }
    connectPieceDebug();

    setActivePuzzlePiece(null);
  };

  const movePiece = (event, figure) => {
    //그룹별로 이동해야됨,
    //for문돌아서 그룹 같은 피스 같이 이동
    console.log("무브");
  };

  const movePieceGroup = () => {};

  // const setGroup = (piece, group) => {
  //   //if (pieceMapRef.current.has)
  // }

  //퍼즐 조각에 새긴 유저 닉네임을 모두 제거한다.
  //유저가 방을 나갈 때 사용
  const removeUserInfoFromPieces = () => {
    for (let i = 0; i < puzzleRef.current.length; i++) {
      for (let j = 0; j < puzzleRef.current[0].length; j++) {
        const piece = puzzleRef.current[i][j];
        if (piece.userInfo == moveData.nickName) {
          piece.userInfo = null;
        }
      }
    }
  };

  //본인이 건드리고 있는 퍼즐 조각, piece, null로 구분, 실제 퍼즐 라이브러리의 figure를 가리킴.
  const setActivePuzzlePiece = (piece) => {
    if (piece == null) {
      console.log(activePuzzlePieceRef.current.userInfo + "손 뗌");
      activePuzzlePieceRef.current.userInfo = null;
    }
    activePuzzlePieceRef.current = piece;
  };

  const connectPieceDebug = () => {
    //서버에서 위치가 바뀐 퍼즐 피스 가져와서 그룹 세팅하기
    console.log("Gdgdgdgd");
    //해당 퍼즐 조각 그룹 이동하기
    // 퍼즐 조각이 연결되었을 경우 출력되는 함수
    canvasRef.current.onConnect(
      (_piece, figure, _target, targetFigure, piece) => {
        console.log(`Pieces ${_piece} and ${_piece} connected and locked.`);

        console.log("붙임 당하는 것", _piece.id);

        console.log("piece ", piece);

        console.log();

        //   console.log("현재꺼 ", _target.id);

        if (_piece.upConnection) {
          console.log("up", _piece.upConnection.metadata.id);
        }
        if (_piece.downConnection) {
          console.log("down", _piece.downConnection.metadata.id);
        }
        if (_piece.leftConnection) {
          console.log("left", _piece.leftConnection.metadata.id);
        }
        if (_piece.rightConnection) {
          console.log("right", _piece.rightConnection.metadata.id);
        }

        const nextIdxList = [
          _piece.upConnection.metadata.id,
          _piece.downConnection.metadata.id,
          _piece.leftConnection.metadata.id,
          _piece.rightConnection.metadata.id,
        ];

        sendMessage(`/pub/check/puzzle/${id}`, {
          currentIdx: _piece.id,
          nextIdxList: nextIdxList,
          x: _piece.x,
          y: _piece.y,
          puzzleSize: puzzleSize,
        });
      }
    );

    /*퍼즐 조각이 연결되었을 떄 실행되는 함수 
    원래 위치에서 얼만큼 이동했는지 출력하는 거 같음*/
    canvasRef.current.onTranslate((piece, _, x, y) => {
      console.log(`Piece Translate ${piece.id} moved to x: ${x}, y: ${y}`);
    });
  };

  return <div ref={boardRef} id={id}></div>;
};
export default GameBoard;
