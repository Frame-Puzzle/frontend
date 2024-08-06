import { useNavigate, useParams } from "react-router-dom";
import "./Directory.css";
import { useEffect } from "react";
import { setDirectoryId } from "../../stores/createBoardSlice";
import { useDispatch } from "react-redux";

const Directory = () => {

  // url Parameter 이름과 동일하게 'id'를 사용해야 한다.
  let { id } = useParams();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  /* 디렉토리 상세페이지에 존재하는 퍼즐판 추가 버튼을 누르면 동률의 위치로
  페이지 라우팅되는 것이므로 고유 디렉토리 번호는 props로 전송 불가하다.
  따라서 디렉토리 상세페이지가 처음으로 mount될 때, Rudex에 고유 디렉토리 번호를 저장해야 한다. */
  useEffect(() => {
    // 주의 : id는 Number가 아닌 String Type
    dispatch(setDirectoryId(id));
  }, []);

  return (<>
    <div>고유 디렉토리 번호 {id}에 해당하는 디렉토리입니다.</div>
    <span style={{cursor: "pointer"}} onClick={() => {
      navigate("/home");
    }}>홈으로 돌아가기</span>
    <span style={{cursor: "pointer"}}>퍼즐판 추가</span>
    </>
  )
}

export default Directory;