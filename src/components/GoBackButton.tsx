import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-light"
      onClick={() => navigate("/")}
    >
      <img
        src={require("../assets/images/go-back-2.png")}
        width={20}
        height={20}
        alt="go back button"
      />
    </button>
  );
};

export default GoBackButton;
