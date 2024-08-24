import api from "./services/api.service";
import { GoodsResponse, ReviewsResponse } from "./types/main";

export enum Routes {
  getReviews = "product-reviews?asin=B07ZPKN6YR&country=US&sort_by=TOP_REVIEWS&star_rating=ALL",
  order = "order",
  getProducts = "search?query=Phone&country=US&sort_by=RELEVANCE&product_condition=ALL",
}

export async function fetchReviews(page: number): Promise<ReviewsResponse> {
  return await api.get<ReviewsResponse>(Routes.getReviews.concat(`&page=${page}`));
}

export async function fetchGoods(page: number): Promise<GoodsResponse> {
  return await api.get<GoodsResponse>(
    Routes.getProducts.concat(`&page=${page}`)
  );
}
