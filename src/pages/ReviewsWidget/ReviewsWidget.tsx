import { FC, useEffect, useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import GoBackButton from "../../components/GoBackButton";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import { IProductReview } from "../../interfaces/productReview.interface";

import { REVIEW_WIDGET_PATH } from "../../constants/paths";

import "./ReviewsWidget.styles.scss";

const schema = yup
  .object({
    name: yup
      .string()
      .required("field name is required")
      .min(2, "name must be bigger than one character!"),
    comment: yup
      .string()
      .required("field comment is required")
      .min(20, "comment must include more than 50 characters"),
    email: yup
      .string()
      .required("field email is required")
      .email("please enter a valid email"),
    phone: yup.string().optional().default(""),
  })
  .required();

type TFormData = yup.InferType<typeof schema>;

const ErrorBox: FC<{ error: string }> = ({ error }) => (
  <div className="invalid-feedback" style={{ display: "block" }}>
    {error}
  </div>
);

const ReviewsWidgetContent: FC<IProductReview> = ({
  comment,
  name,
  rate,
  timestamp,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormData>({
    resolver: yupResolver(schema),
  });
  const showReadMoreIcon = comment.length > 500;
  const [readMore, setReadMore] = useState<boolean>(!showReadMoreIcon);
  const navigate = useNavigate();

  const onSubmit = async (data: TFormData) => {
    try {
      const timestamp = new Date().getTime();
      const randomRate = Math.ceil(Math.random() * 5);
      const body: Omit<IProductReview, "id"> = {
        ...data,
        timestamp,
        rate: randomRate,
      };
      await fetch(`http://localhost:5000/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reviews-widget">
      <div className="reviews">
        <h3>{name}</h3>
        <h6>{format(new Date(timestamp), "MMMM dd, yyyy")}</h6>
        <Rating
          size={20}
          emptyColor="grey"
          fillColor="#43656F"
          initialValue={rate}
          allowHover={false}
        />
        <div>
          <h6>{!readMore ? `${comment.substring(0, 500)}..` : comment}</h6>
          {showReadMoreIcon && !readMore && (
            <PrimaryButton text="read more" onClick={() => setReadMore(true)} />
          )}
          {showReadMoreIcon && readMore && (
            <PrimaryButton
              text="hide comment"
              onClick={() => setReadMore(false)}
            />
          )}
        </div>
      </div>
      <div className="vertical-line mh-12" />
      <PrimaryButton
        text="read all reviews"
        onClick={() => navigate(REVIEW_WIDGET_PATH)}
      />

      <div className="leave-review">
        <h4 className="text-uppercase">leave a review</h4>
        <div className="mh-12">
          Your email address will not be published. Required fields are marked *
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <textarea
              className="form-control h100"
              placeholder="Comment *"
              {...register("comment")}
            />
            {errors.comment?.message && (
              <ErrorBox error={errors.comment?.message} />
            )}
          </div>
          <div className="row">
            <div className="col">
              <input
                className="form-control h50"
                type="text"
                placeholder="Name *"
                {...register("name")}
              />
              {errors.name?.message && (
                <ErrorBox error={errors.name?.message} />
              )}
            </div>
            <div className="col">
              <input
                className="form-control h50"
                type="email"
                placeholder="Email *"
                {...register("email")}
              />
              {errors.email?.message && (
                <ErrorBox error={errors.email?.message} />
              )}
            </div>
          </div>

          <div className="mb-3 mh-12">
            <input
              className="form-control h50"
              type="tel"
              placeholder="Phone (optional)"
              {...register("phone")}
            />
            {errors.phone?.message && (
              <ErrorBox error={errors.phone?.message} />
            )}
          </div>

          <div className="mh-12">
            <input type="checkbox" id="checkbox" className="mr-4" />
            <label htmlFor="checkbox">
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>

          <button type="submit" className="submit-btn">
            post review
          </button>
        </form>
      </div>
    </div>
  );
};

const ReviewsWidget = () => {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<IProductReview | null>(null);

  useEffect(() => {
    if (!review) {
      (async () => {
        try {
          const response = await fetch(`http://localhost:5000/reviews/${id}`);
          const result = await response.json();
          setReview(result);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [review, id]);

  if (!review)
    return (
      <>
        <h1>Can't find current review</h1>;
        <GoBackButton />
      </>
    );

  return <ReviewsWidgetContent {...review} />;
};

export default ReviewsWidget;
