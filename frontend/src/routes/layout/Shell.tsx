import AppNav from "../../components/AppNav";
import { Outlet } from "react-router-dom";

const Shell = () => {
  return (
    <>
      <AppNav />
      <body>
        <Outlet />
      </body>
    </>
  );
};

export default Shell;
