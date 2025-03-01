import React from "react";
import { BrowserRouter } from "react-router-dom";
// import ScrollToTop from "../components/layout/common/ScrollToTop";
const RouterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <BrowserRouter>
      {/* <ScrollToTop /> */}
      {children}
    </BrowserRouter>
  );
};

export default RouterProvider;
