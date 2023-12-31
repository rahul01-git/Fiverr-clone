import React, { useState } from "react";
import "./Reviews.scss";
import Review from "../review/Review";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const [reviewError, setReviewError] = useState(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      setReviewError(null);
    },
    onError: (error) => {
      setReviewError(error.response.data);
      setTimeout(()=>{
        setReviewError(null)
      },3000)
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;

    mutation.mutate({ gigId, desc, star });
  };
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "something went wrong"
        : data.map((review) => <Review key={review._id} review={review} gigId={gigId} />)}
      <div className="add">
        <h3>Add a review</h3>
        {reviewError &&
          <p className="error">{reviewError}</p>
          }
        <form onSubmit={handleSubmit} className="addForm">
          <input type="text" placeholder="write  your review" />
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
