import "./SelectCategory.css";

const SelectCategory = (props) => {

  if (props.category === "friend") {
    return (
      <div className="select-category-component-container">
        <div className="category-image"></div>
        <span>친구</span>
      </div>
    )
  } else if (props.category === "family") {
    return (
      <div className="select-category-component-container"></div>
    )
  } else if (props.category === "lover") {
    return (
      <div className="select-category-component-container"></div>
    )
  } else if (props.category === "pet") {
    return (
      <div className="select-category-component-container"></div>
    )
  } else {
    return (
      <div>선택할 수 없는 카테고리를 props로 전달하였습니다.</div>
    )
  }
}

export default SelectCategory;