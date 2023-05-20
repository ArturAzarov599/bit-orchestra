import { useNavigate } from "react-router-dom";

import {
  PRODUCT_LIST_WIDGET_PATH,
  REVIEW_WIDGET_PATH,
} from "../constants/paths";
import PageTitle from "../components/PageTitle";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>Available widgets:</PageTitle>
      <ul className="list-group">
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          onClick={() => navigate(PRODUCT_LIST_WIDGET_PATH)}
        >
          Product List Widget
        </li>

        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          onClick={() => navigate(REVIEW_WIDGET_PATH)}
        >
          Reviews Widget
        </li>
      </ul>
    </>
  );
};

export default Home;
