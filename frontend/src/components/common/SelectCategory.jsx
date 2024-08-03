import "./SelectCategory.css";

const SelectCategory = (props) => {

  if (props.category === "friend") {
    return (
      <div className="select-category-component-container" onClick={() => { props.setWho('friend'); }}>
        <div className="category-image-friend"></div>
        <span>친구</span>
      </div>
    )
  } else if (props.category === "family") {
    return (
      <div className="select-category-component-container" onClick={() => { props.setWho('family'); }}>
        <div className="category-image-family"></div>
        <span>가족</span>
      </div>
    )
  } else if (props.category === "lover") {
    return (
      <div className="select-category-component-container" onClick={() => { props.setWho('lover'); }}>
        <div className="category-image-lover"></div>
        <span>연인</span>
      </div>
    )
  } else if (props.category === "pet") {
    return (
      <div className="select-category-component-container" onClick={() => { props.setWho('pet'); }}>
        <div className="category-image-pet"></div>
        <span>반려동물</span>
      </div>
    )
  } else {
    return (
      <div>선택할 수 없는 카테고리를 props로 전달하였습니다.</div>
    )
  }
}

export default SelectCategory;