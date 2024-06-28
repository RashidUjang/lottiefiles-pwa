import AppNav from "../../components/AppNav";
import { Outlet } from "react-router-dom";
import { Toaster } from "../../components/ui/AppToaster"


const Shell = () => {
  return (
    <>
      <AppNav />
      <body className="px-56">
        <Outlet />
        <Toaster />
      </body>
    </>
  );
};

export default Shell;
