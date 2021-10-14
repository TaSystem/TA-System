import Navbar from "./Navbar";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  console.log("in layout ", children);
  const router = useRouter();
  if (String(router.pathname) == "/signin") {
    return (
      <div>
        <div className="content">{children}</div>
      </div>
    );
  }
  return (
    <div class="container-fluid">
    <div class="row">
        <div class="col min-vh-100 p-4">
        <Navbar/>
          <a class="border rounded-3 p-1 text-decoration-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" style={{cursor:"pointer"}}><i class="bi bi-list bi-lg py-2 p-1"></i> Menu</a>
        {/* <Navbar2/> */}
        {children}
      </div>
      </div>
      </div>
  );
};

export default Layout;
