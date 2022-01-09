import { configureStore } from "@reduxjs/toolkit";
import topSales from "./fetchTopSales";
import categories from "./fetchCategories";
import catalog from "./fetchCatalog";
import searchField from "./fetchSearch";
import fullCard from "./fetchFullCard";
import cartState from "./cartReducer";
import orderState from "./fetchOrder";

const store = configureStore({
  reducer: {
    topSales,
    categories,
    catalog,
    fullCard,
    searchField,
    cartState,
    orderState,
  },
});

export default store;
