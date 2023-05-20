import { FC, PropsWithChildren } from "react";

const CenteredList: FC<PropsWithChildren> = ({ children }) => (
  <div className="d-flex justify-content-between align-items-center">
    {children}
  </div>
);

export default CenteredList;
