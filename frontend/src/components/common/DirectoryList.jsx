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

  // 실질적으로 아래 JSX 문법 중 map을 이용해서 반복을 돌건데, 그 기준이 되는 배열
  // 배열 갈아치울 때, 얕은 복사를 고려해서 spread 연산자를 사용해야 한다.
  // 배열 초깃값을 useState안에 적어주어야 하는데 보통 뭘로 하더라? 찾아보자.
  let [categoryList, setCategoryList] = useState();

  let [category, setCategory] = useState();

  // 위에서 정의한 함수 호출하기
  useEffect(() => {
    
  });

  return (
    <div className="w-full h-full">
      <div className="category-index flex">
        <span>전체</span>
        <span>친구</span>
        <span>가족</span>
        <span>연인</span>
        <span>반려동물</span>
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