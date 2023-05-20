import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import ReviewsWidget from "./pages/ReviewsWidget/ReviewsWidget";
import GoBackButton from "./components/GoBackButton";
import ProductListWidget from "./pages/ProductListWidget";

import {
  PRODUCT_LIST_WIDGET_PATH,
  REVIEW_WIDGET_PATH,
} from "./constants/paths";

const App = () => (
  <BrowserRouter>
    <GoBackButton />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={REVIEW_WIDGET_PATH} element={<Reviews />} />
        <Route path={`${REVIEW_WIDGET_PATH}/:id`} element={<ReviewsWidget />} />
        <Route
          path={PRODUCT_LIST_WIDGET_PATH}
          element={<ProductListWidget />}
        />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
