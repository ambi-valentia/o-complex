import { useDispatch, useSelector } from "react-redux";
import {
  selectReviews,
  selectReviewsLoading,
} from "store/selectors/main.selector";
import classes from "./Reviews.module.scss";
import { UiCard } from "components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "store/reducers/main.slice";

export function Reviews() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const reviewsLoading = useSelector(selectReviewsLoading);

  useEffect(() => {
    dispatch(getReviews({ page: 1, asin: id || 'B07ZPKN6YR' }));
  }, []);

  return (
    <div className={classes.reviews}>
      {Object.values(reviews).map((review) => (
        <div className={classes.review}>
          <UiCard
            heading={
              reviewsLoading
                ? ""
                : review.review_title.concat(
                    " " + "★".repeat(Number(review.review_star_rating))
                  ) + "☆".repeat(5 - Number(review.review_star_rating))
            }
            bottomBar={[
              reviewsLoading ? (
                <div />
              ) : (
                <>
                  <div>{review.review_author}</div>{" "}
                  <img
                    src={review.review_author_avatar}
                    width={30}
                    height={30}
                  />
                </>
              ),
            ]}
            key={review.review_id}
          >
            {reviewsLoading ? (
              <>LOADING...</>
            ) : (
              <div>{review.review_comment}</div>
            )}
          </UiCard>
        </div>
      ))}
    </div>
  );
}
