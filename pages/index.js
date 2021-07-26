import { signIn, signOut, useSession } from "next-auth/client";
import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Axios from "../config/Axios";
import { connect } from "react-redux";
import { setDetailNisit } from "../redux/actions/nisitAction";

function Page(props) {
  const [session, loading] = useSession();

  // useEffect(() => {
  //   session != undefined
  //     ? axios.post("http://localhost:3001/users/login", {
  //         email: session.user.email,
  //         name_email: session.user.name,
  //         imgURL: session.user.image,
  //       })
  //         .then((res) => {
  //           console.log(res.data)
  //           alert("post Complete");
  //         })
  //         .catch(() => {
  //           alert("fail to post");
  //         })
  //     : null;
  // }, [session]);
  
   console.log('props in index',props , 'session is ',session)
  return (
    <>
      {!session && (
        <>
          {console.log("status case1 ", session)}
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          {/* <Navbar/> */}
          {console.log("status case2", session)}
          Signed in as {session.user.email} <br />
          

          <button>
            <Link href="/nisit/registerNisit">To the Register</Link>
          </button>

          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  nisit: state.nisit
})

const mapDispatchToProps = {
  setDetailNisit: setDetailNisit,
};

export default connect(mapStateToProps,mapDispatchToProps)(Page)