import { useEffect, useState } from "react";
import "./DirectoryList.css";
import directoryApi from "../../apis/directoryApi";
import DirectoryItem from "./DirectoryItem";

const DirectoryList = () => {
  // 백에게 카테고리별로 디렉토리 정보를 요청해서 데이터를 가져오는 함수 정의하기
  const fetchDirectories = async (category) => {
    try {
      // 카테고리를 포함한 GET 요청을 보내기
      const response = await directoryApi.get(``, {
        // friend, family, lover, pet
        params: { category },
      });
      return response;
    } catch (error) {
      console.error("Error fetching directories:", error);
      throw error;
    }
  };
  // 예시로 'friend' 카테고리에 대한 데이터를 가져오는 경우
  // fetchDirectories('friend');

  // 실질적으로 아래 JSX 문법 중 map을 이용해서 반복을 돌건데, 그 기준이 되는 배열
  // [{...}, {...}, ..., {...}] 형태
  let [categoryList, setCategoryList] = useState([]);
  let [category, setCategory] = useState("");

  // 위에서 정의한 함수 호출하기
  useEffect(() => {
    const ueFetchDirectories = async (category) => {
      if (category === "") {
        const response = await fetchDirectories();
        const directoryList = response.data.data.directoryList;
        const deepcopy = [...directoryList];
        setCategoryList(deepcopy);
      } else {
        const response = await fetchDirectories(category);
        const directoryList = response.data.data.directoryList;
        const deepcopy = [...directoryList];
        setCategoryList(deepcopy);
      }
    };
    ueFetchDirectories(category);
  }, [category]);

  const categoryIndex = [
    { name: "전체", value: "" },
    { name: "친구", value: "friend" },
    { name: "가족", value: "family" },
    { name: "연인", value: "lover" },
    { name: "반려동물", value: "pet" },
  ];

  return (
    <div className="w-full h-full">
      <div className="category-index flex">
        {categoryIndex.map((each) => (
          <span
            key={each.name}
            onClick={() => setCategory(each.value)}
            className={category === each.value ? "active" : ""}
          >
            {each.name}
          </span>
        ))}
      </div>
      <div className="category-content flex">
        {
          categoryList.map((a, i) => {
            return <DirectoryItem key={i} info={a} />;
          })
          /* create Component to use map function */
          /* <components/common/Directory /> 여러 개에 각각 정보 넘겨주기 */
        }
      </div>
    </div>
  );
};

export default DirectoryList;
