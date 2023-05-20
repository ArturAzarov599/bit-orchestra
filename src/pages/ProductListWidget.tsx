import { useEffect, useState } from "react";

import ProductDetails from "../components/ProductDetails/ProductDetails";
import { IProductDetails } from "../interfaces/productDetails.interface";

const ProductListWidget = () => {
  const [products, setProducts] = useState<IProductDetails[]>([]);

  useEffect(() => {
    (async () => {
      (async () => {
        try {
          const response = await fetch(`http://localhost:5000/products`);
          const result = await response.json();
          setProducts(result);
        } catch (error) {
          console.error(error);
        }
      })();
    })();
  }, []);

  return (
    <>
      <h6 className="text-uppercase text-center">
        the innovation leader in luxury vinyl plank
      </h6>
      <h4 className="text-capitalize text-center">let's get started</h4>

      <ul className="d-flex flex-wrap">
        {products.map((product) => (
          <ProductDetails key={product.name} {...product} />
        ))}
      </ul>
    </>
  );
};

export default ProductListWidget;
