export interface Review {
  id: number;
  text: string;
}

export interface ReviewsResponse {
  reviews: Review[];
}

export interface ShoppingItem {
  name: string;
  amount: number;
  price: number;
}

export interface Good {
  id?: number;
  image_url?: string;
  title: string;
  description: string;
  price: number;
}
