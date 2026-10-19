import { RouterProvider } from "react-router-dom";
import ScrollToTop from "./website/components/ScrollToTop";

const RouterWrapper = ({ router }) => {
  return (
    <>
      <ScrollToTop />
      <RouterProvider router={router} />
    </>
  );
};

export default RouterWrapper;