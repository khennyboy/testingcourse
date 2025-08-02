import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="prose p-5">
        <Outlet />
        <Toaster />
      </main>
    </>
  );
};

export default Layout;
