import Navbar from "./Navbar";
import Navbar2 from './Navbar2'
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
    <div>
      <div className="content">
        <Navbar/>
        {/* <Navbar2/> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
