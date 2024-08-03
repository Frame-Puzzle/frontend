import { useParams } from "react-router-dom";
import "./Directory.css";

const Directory = () => {

  // url Parameter 이름과 동일하게 'id'를 사용해야 한다.
  let { id } = useParams();

  return (
    <div>고유 디렉토리 번호 {id}에 해당하는 디렉토리입니다.</div>
  )
}

export default Directory;