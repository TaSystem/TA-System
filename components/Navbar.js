import Link from "next/link";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";

const Navbar = () => {
  const [session, loading] = useSession();
  const router = useRouter();

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
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link href="/nisit">
            <a class="navbar-brand">SA</a>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link href="/nisit/registerNisit">
                <a class="nav-item nav-link">กรอกข้อมูลนิสิต </a>
              </Link>
              <Link href="/nisit/historyRequest">
                <a class="nav-item nav-link">รายวิชาที่ยื่นขอ </a>
              </Link>
              <Link href="/nisit/addBank">
                <a class="nav-item nav-link">กรอกข้อมูลธนาคาร </a>
              </Link>
              <Link href="/nisit">
                <a class="nav-item nav-link">รายวิชาที่เปิดรับTA </a>
              </Link>
              <Link href="/nisit/requestTA">
                <a class="nav-item nav-link">ลงทะเบียนTA </a>
              </Link>

              <a class="nav-item nav-link" onClick={() => signOut()}>
                Sign Out
              </a>
              {/* <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => signOut()}
              >
                Sign Out
              </button> */}
            </div>
          </div>
        </nav>
      );
    } else if (domain.includes("gmail")) {
      return (
        // <nav className="logo" style={{ backgroundColor: "gray" }}>
        //   <h1 style={{ color: "red" }}>Navbar Ta-system List</h1>
        //   <Link href="/">
        //     <a>Home</a>
        //   </Link>
        //   <Link href="/nisit/registerNisit">
        //     <a>Request Register</a>
        //   </Link>
        //   {/* <Link href="/nisit/addBank">
        //     <a>Add Bank</a>
        //   </Link> */}

        //   {/* <Link href='/profile'><a>Profile</a></Link> */}
        // </nav>

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link href="/provost/provostCourses">
            <a class="navbar-brand">SA</a>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link href="/provost/coursesImport">
                <a class="nav-item nav-link">เพิ่มรายวิชาที่เปิดสอน </a>
              </Link>
              <Link href="/provost/provostCourses">
                <a class="nav-item nav-link">รายวิชาที่เปิดสอน </a>
              </Link>

              <Link href="/provost/nisitRequest">
                <a class="nav-item nav-link">รายชื่อนิสิตที่ขอ </a>
              </Link>
              <Link href="/provost">
                <a class="nav-item nav-link">รายวิชาของเจ้าหน้าที่ </a>
              </Link>
              <Link href="/provost/deputyDeanRequest">
                <a class="nav-item nav-link">คำขอนิสิตของรองคณบดี </a>
              </Link>
              <Link href="/provost/headRequest">
                <a class="nav-item nav-link">คำขอนิสิตของหัวหน้าภาค </a>
              </Link>
              <Link href="/provost/officerRequest">
                <a class="nav-item nav-link">คำขอนิสิตของเจ้าหน้าที่ </a>
              </Link>
              <Link href="/provost/provostHItoryApply">
                <a class="nav-item nav-link">รายวิชาที่ยื่นขอTA </a>
              </Link>
              <Link href="/provost/officerSystem">
                <a class="nav-item nav-link">ตั้งค่าระบบ </a>
              </Link>
              {/* <Link href="/nisit/requestTA">
              <a class="nav-item nav-link">ลงทะเบียนTA </a>
            </Link> */}

              <a class="nav-item nav-link" onClick={() => signOut()}>
                Sign Out
              </a>
            </div>
          </div>
        </nav>
      );
    }
  } else {
    return (
      <nav class="navbar navbar-dark bg-dark">
        {/* <Link href="/nisit"> */}
        <a class="navbar-brand">
          <span /> SA
        </a>
        {/* </Link> */}
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </nav>
    );
  }
};

export default Navbar;
