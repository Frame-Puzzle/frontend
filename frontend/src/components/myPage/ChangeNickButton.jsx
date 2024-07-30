import "./ChangeNickButton.css";

const ChangeNickButton = ({ text, onClick }) => {
  return (
    <span onClick={onClick} className="change-nick-button">
      {text}
    </span>
  );
};

export default ChangeNickButton;
