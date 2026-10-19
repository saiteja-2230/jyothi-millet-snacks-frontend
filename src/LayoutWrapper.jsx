import { Outlet } from "react-router-dom";
import ScrollToTop from "./website/components/ScrollToTop";

const LayoutWrapper = () => {
  return (
    <>
      <ScrollToTop />  {/* ✅ NOW INSIDE ROUTER */}

      <Outlet />
    </>
  );
};

export default LayoutWrapper;