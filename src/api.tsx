import api from "./services/api.service";
import { GoodsResponse, ReviewsResponse } from "./types/main";

export enum Routes {
  getReviews = "reviews",
  order = "order",
  getProducts = "search?query=Phone&country=US&sort_by=RELEVANCE&product_condition=ALL",
}

export async function fetchReviews(): Promise<ReviewsResponse> {
  return await api.get<ReviewsResponse>(Routes.getReviews);
}

export async function fetchGoods(page: number): Promise<GoodsResponse> {
  return await api.get<GoodsResponse>(
    Routes.getProducts.concat(`&page=${page}`)
  );
}
