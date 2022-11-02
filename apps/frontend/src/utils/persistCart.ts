import { CartItem } from "../store/entities/cart";

export default function persistCart(items?: CartItem[]): CartItem[] {
  if (items) {
    localStorage.setItem("cart", JSON.stringify(items));
  }

  return JSON.parse(localStorage.getItem("cart") || "[]");
}
