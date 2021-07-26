import Link from "next/link";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

const Navbar = () => {
  const [session, loading] = useSession();

  if (session) {
    var domain = String(session.user.email).substring(
      String(session.user.email).lastIndexOf("@") + 1
    );

    if (domain.includes("ku.th")) {
      return (
        // <nav className="logo" style={{ backgroundColor: "gray" }}>
        //   <h1 style={{ color: "red" }}>Navbar Ta-system List</h1>
        //   <Link href="/nisit">
        //     <a>Home</a>
        //   </Link>
        //   <Link href="/nisit/registerNisit">
        //     <a>Request Register </a>
        //   </Link>
        //   <Link href="/nisit/addBank">
        //     <a>Add Bank</a>
        //   </Link>

        //   {/* <Link href='/profile'><a>Profile</a></Link> */}
        // </nav>
        <nav class="navbar navbar-dark bg-dark">
          
          <Link href="/nisit">
             <a class="navbar-brand"><span/> SA</a>
           </Link>
          {/* <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button> */}
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-item nav-link active" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
              <a class="nav-item nav-link" href="#">
                Features
              </a>
              <a class="nav-item nav-link" href="#">
                Pricing
              </a>
              {/* <a class="nav-item nav-link disabled" href="#">
                Disabled
              </a> */}
            </div>
          </div>
        </nav>
      );
    } else if (domain.includes("gmail")) {
      return (
        <nav className="logo" style={{ backgroundColor: "gray" }}>
          <h1 style={{ color: "red" }}>Navbar Ta-system List</h1>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/nisit/registerNisit">
            <a>Request Register</a>
          </Link>
          {/* <Link href="/nisit/addBank">
            <a>Add Bank</a>
          </Link> */}

          {/* <Link href='/profile'><a>Profile</a></Link> */}
        </nav>
      );
    }
  } else {
    return <div></div>;
  }
};

export default Navbar;
