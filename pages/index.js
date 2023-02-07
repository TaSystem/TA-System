import { signIn, signOut, useSession } from "next-auth/client";
import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Axios from "../config/Axios";
import { connect } from "react-redux";
import { setDetailNisit } from "../redux/actions/nisitAction";
import { useRouter } from "next/router";
import Date from '../components/DatePickers'

function Redirect({ to }) {
  const router = useRouter();
  //console.log("in useEffect");
  useEffect(() => {
    router.push(to);
  }, [router, to]);
  return null;
}

function Page(props) {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {

    if(session){
      //console.log("test login", session.user)
     } 
     else{
       //console.log("not session")
       signIn()
     }

  },[loading, session])

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

  //console.log("props in index", props, "session is ", session);
  return (
    <>
      {!session && (
        <>
          {/* <Redirect to='/nisit'/> */}
          {/* Not signed in <br /> */}

          {/* <button onClick={() => signIn()}>Sign in</button> */}
          {/* <Date/> */}
        </>
      )}
      {session && (
        <>
          {/* <Navbar/>
          Signed in as {session.user.email} <br />
          <button>
            <Link href="/nisit/registerNisit">To the Register</Link>
          </button>
          <button onClick={() => signOut()}>Sign out</button> */}
        </>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  nisit: state.nisit,
});

const mapDispatchToProps = {
  setDetailNisit: setDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
