import "./BoardSelectSize.css";

// Create Board의 첫 번째 전환 컴포넌트
const BoardSelectSize = () => {
  return (
    <div className="board-select-size w-full h-full">
      <div className="board-select-size-progress flex">
        <span>1</span>
        <span>2</span>
      </div>
      <div className="board-select-size-title">
        <span>퍼즐 판의 크기를</span>
        <span>설정해 주세요.</span>
      </div>
      <div className="board-select-size-button">
        <span>3X4</span>
        <span>4X5</span>
        <span>5X6</span>
      </div>
      <div className="board-select-size-next">
        <span>다음</span>
      </div>
    </div>
  )
}

export default BoardSelectSize;