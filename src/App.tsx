import { Route, Routes } from "react-router-dom";
import { Products } from "./pages/products/Products";
import { Cart } from "pages/cart/Cart";
import { Layout } from "components/layout/Layout";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="o-complex" element={<Products />} />
        <Route path="o-complex/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}
