import './DirectoryList.css';

const DirectoryList = () => {
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