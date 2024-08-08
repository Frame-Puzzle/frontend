import "./RectangularButton.css";

const RectangularButton = ({ text, type, onClick }) => {
  return (
    <span onClick={onClick} className={`rectangular-button button-${type}`}>
      {text}
    </span>
  );
};

export default RectangularButton;
