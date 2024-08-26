import { Route, Routes } from "react-router-dom";
import { Products } from "./pages/products/Products";
import { Cart } from "pages/cart/Cart";
import { Layout } from "components/layout/Layout";
import { Reviews } from "pages/reviews/Reviews";
import { Paths } from "constants/routes";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={Paths.Products} element={<Products />} />
        <Route path={Paths.Cart} element={<Cart />} />
        <Route path={Paths.Reviews} element={<Reviews />} />
      </Route>
    </Routes>
  );
}
