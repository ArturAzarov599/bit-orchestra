import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PageTitle from "../components/PageTitle";

import { IProductReview } from "../interfaces/productReview.interface";
import { REVIEW_WIDGET_PATH } from "../constants/paths";

const bgRateOptions: Record<number, string> = {
  1: "text-bg-danger",
  2: "text-bg-danger",
  3: "text-bg-warning",
  4: "text-bg-warning",
  5: "text-bg-success ",
};

const Reviews = () => {
  const navigate = useNavigate();
  const [productReviews, setProductReviews] = useState<IProductReview[]>([]);

  useEffect(() => {
    if (!productReviews.length) {
      (async () => {
        try {
          const response = await fetch(`http://localhost:5000/reviews`);
          const result = await response.json();
          setProductReviews(result);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [productReviews.length]);

  return (
    <>
      <PageTitle>Reviews list:</PageTitle>
      <ul className="list-group list-group-numbered">
        {productReviews.map(({ name, rate, email, id }) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-start"
            key={id}
            onClick={() => navigate(`${REVIEW_WIDGET_PATH}/${id}`)}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{name}</div>
              {email}
            </div>
            <span className={`badge rounded-pill ${bgRateOptions[rate]}`}>
              {rate}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Reviews;
