export type Theme = 'dark' | 'light';

export interface Review {
  review_id: string;
  review_title: string;
  review_comment: string;
  review_star_rating: string;
  review_author: string;
  review_author_avatar: string;
}

export interface ReviewsResponse {
  data: Review[];
}

export interface OrderResponse {
  success: number;
  error?: string;
}

export interface CartItemRequest {
  id: number;
  quantity: number;
}

export interface OrderRequest {
  phone: string;
  cart: CartItemRequest[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export interface Good {
  asin: string;
  product_photo?: string;
  product_title: string;
  description?: string;
  product_price: string;
}

export interface GoodsAction {
  page: number;
}

export interface ReviewsAction extends GoodsAction {
  asin: string;
}

export interface GoodsResponse {
  status: string;
  data: {
    total_products: number;
    country: string;
    domain: string;
    products: Good[];
  };
}
