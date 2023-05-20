import { FC, PropsWithChildren } from "react";

const PageTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-uppercase">{children}</h2>
);

export default PageTitle;
