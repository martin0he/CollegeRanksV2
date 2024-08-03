import { Review } from "./types";

export const calculateReviewAverage = (reviews: Review[]) => {
  const reviewAverage = {
    academics: 0,
    housing: 0,
    location: 0,
    clubs: 0,
    food: 0,
    social: 0,
    opportunities: 0,
    safety: 0,
    overall: 0,
  };

  reviews.forEach((review) => {
    reviewAverage.academics += review.academics;
    reviewAverage.housing += review.housing;
    reviewAverage.location += review.location;
    reviewAverage.clubs += review.clubs;
    reviewAverage.food += review.food;
    reviewAverage.social += review.social;
    reviewAverage.opportunities += review.opportunities;
    reviewAverage.safety += review.safety;
    reviewAverage.overall += review.overall;
  });

  reviewAverage.academics = reviewAverage.academics / reviews.length;
  reviewAverage.housing = reviewAverage.housing / reviews.length;
  reviewAverage.location = reviewAverage.location / reviews.length;
  reviewAverage.clubs = reviewAverage.clubs / reviews.length;
  reviewAverage.food = reviewAverage.food / reviews.length;
  reviewAverage.social = reviewAverage.social / reviews.length;
  reviewAverage.opportunities = reviewAverage.opportunities / reviews.length;
  reviewAverage.safety = reviewAverage.safety / reviews.length;
  reviewAverage.overall = reviewAverage.overall / reviews.length;

  return reviewAverage;
};
