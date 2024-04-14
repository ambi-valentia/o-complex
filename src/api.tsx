import api from "./services/api.service";
import { GoodsResponse, ReviewsResponse } from "./types/main";

export enum Routes {
  getReviews = "reviews",
  order = "order",
  getProducts = "products?",
}

export async function fetchReviews(): Promise<ReviewsResponse> {
  return await api.get<ReviewsResponse>(Routes.getReviews);
}

export async function fetchGoods(
  page: number,
  pageSize: number
): Promise<GoodsResponse> {
  return await api.get<GoodsResponse>(
    Routes.getProducts.concat(`page=${page}&page_size=${pageSize}`)
  );
}
