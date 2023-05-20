import { FC } from "react";

import "./PrimaryButton.styles.scss";

interface IPrimaryButtonProps {
  onClick: () => void;
  text: string;
}

const PrimaryButton: FC<IPrimaryButtonProps> = ({ onClick, text }) => (
  <button className="primary-button" onClick={onClick}>
    {text}
  </button>
);

export default PrimaryButton;
