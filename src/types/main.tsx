export interface Review {
  id: number;
  text: string;
}

export interface ReviewsResponse {
  reviews: Review[];
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
  id: number;
  name: string;
  amount: number;
  price: number;
}

export interface Good {
  id: number;
  image_url?: string;
  title: string;
  description: string;
  price: number;
}

export interface GoodsAction {
  page: number;
  page_size: number; 
}

export interface GoodsResponse {
  page: number; 
  amount: number;
  total: number;
  items: Good[];
}
