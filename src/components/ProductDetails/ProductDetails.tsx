import { FC, ReactElement } from "react";

import CenteredList from "../CenteredList";

import { IProductDetails } from "../../interfaces/productDetails.interface";

import "./ProductDetails.styles.scss";
import { LikeIcon } from "../../assets/icons/LikeIcon";

const generateIcon = (bgColor: string): ReactElement => (
  <div className="icon mr-4" style={{ backgroundColor: bgColor }} />
);

const ProductDetails: FC<IProductDetails> = ({
  image,
  imageText,
  isAvailable,
  name,
  price,
  producer,
  availablePlace,
}) => {
  const iconBgColor = isAvailable ? `green` : `silver`;

  return (
    <li className="product-details-wrapper">
      <div className="product-details">
        <div className="position-relative">
          <img className="product-image" src={image} alt={imageText} />
          <div className="position-absolute top-0 shop-now bg-info">
            <span>Shop now</span>
          </div>
          <LikeIcon />

          <h4 className="product-details-text position-absolute text-capitalize bottom-0 text-decoration-underline ml-8">
            product details
          </h4>
        </div>

        <CenteredList>
          <span>{name}</span>
          <span>{price} $</span>
        </CenteredList>

        <span>{producer}</span>

        <CenteredList>
          <CenteredList>
            {generateIcon(iconBgColor)}
            <span>{availablePlace}</span>
          </CenteredList>

          <CenteredList>
            <span className="mr-4">Compare</span>
            <input className="product-checkbox" type="checkbox" />
          </CenteredList>
        </CenteredList>
      </div>
    </li>
  );
};

export default ProductDetails;
