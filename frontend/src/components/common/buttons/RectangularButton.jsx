import "./RectangularButton.css";

const RectangularButton = ({ text, type, onClick }) => {
  return (
    <button onClick={onClick} className={`rectangular-button button_${type}`}>
      {text}
    </button>
  );
};

export default RectangularButton;
