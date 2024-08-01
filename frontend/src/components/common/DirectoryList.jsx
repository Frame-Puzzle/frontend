import { useEffect, useState } from 'react';
import './DirectoryList.css';
import directoryApi from '../../apis/directoryApi';

const DirectoryList = () => {

  // 백에게 카테고리별로 디렉토리 정보를 요청해서 데이터를 가져오는 함수 정의하기
  const fetchDirectories = async (category) => {
    try {
      // 카테고리를 포함한 GET 요청을 보내기
      const response = await directoryApi.get(``, {
        // friend, family, lover, pet
        params: { category }
      });
      return response;
    } catch (error) {
      console.error('Error fetching directories:', error);
      throw error;
    }
  }
  // 예시로 'friend' 카테고리에 대한 데이터를 가져오는 경우
  // fetchDirectories('friend');

  // 실질적으로 아래 JSX 문법 중 map을 이용해서 반복을 돌건데, 그 기준이 되는 배열
  // [{...}, {...}, ..., {...}] 형태
  let [categoryList, setCategoryList] = useState([]);

  let [category, setCategory] = useState('');

  // 위에서 정의한 함수 호출하기
  useEffect(() => {
    if (category === '') {
      const response = fetchDirectories();
      const directoryList = response.data.data.directoryList;
      setCategoryList(directoryList);
    } else {
      const response = fetchDirectories(category);
      const directoryList = response.data.data.directoryList;
      setCategoryList(directoryList);
    }
  }, [category]);

  return (
    <div className="w-full h-full">
      <div className="category-index flex">
        <span onClick={() => { setCategory(''); }}>전체</span>
        <span onClick={() => { setCategory('friend'); }}>친구</span>
        <span onClick={() => { setCategory('family'); }}>가족</span>
        <span onClick={() => { setCategory('lover'); }}>연인</span>
        <span onClick={() => { setCategory('pet'); }}>반려동물</span>
      </div>
      <div className="category-content">
        {
          /* create Component to use map function */
          /* <components/common/Directory /> 여러 개에 각각 정보 넘겨주기 */
        }
      </div>
    </div>
  )
}

export default DirectoryList;