import api from "./services/api.service";
import { ReviewsResponse } from "./types/main";

export enum Routes {
    getReviews = 'reviews',
}

export async function fetchReviews(): Promise<ReviewsResponse> {
    return await api.get<ReviewsResponse>(Routes.getReviews);
  }