import Navbar from "./Navbar";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from 'react'

const Layout = ({ children }) => {
  //console.log("in layout ", children);
  const router = useRouter()
  const [session, loading] = useSession();

  useEffect(() => {
    if (!(session || loading)) {
      // console.log('///signin is ',session)
      router.push('/signin')
    }else if(session){
      var domain = String(session.user.email).substring(
        String(session.user.email).lastIndexOf("@") + 1
      );

      if(domain.includes("ku.th")){
        //console.log('///signin with KU is ',session ,String(router.pathname))
        let resultPath = String(router.pathname).split('/')
        let check = true
        //console.log('///signin with KU ResultPath is ',resultPath)
        resultPath.map((path) => { 
          if(path == 'nisit'){
            //console.log('currect Per ',path)
            check = false
          }
        })
        if(check){
          //console.log('currect Per ',resultPath)
          router.push('/nisit')
        }

      }else if(domain.includes("gmail")){
        //console.log('///signin with Gmail is ',session ,String(router.pathname))
        let resultPath = String(router.pathname).split('/')
        let check = true
        //console.log('///signin with Gmail ResultPath is ',resultPath)
        resultPath.map((path) => { 
          if(path == 'provost'){
            //console.log('currect Per ',path)
            check = false
          }
        })
        if(check){
          //console.log('currect Per ',resultPath)
          router.push('/provost/provostCourses')
        }
      }
      
    }
  }, [session, loading, router])

if (String(router.pathname) == "/signin") {
    return (
      <div>
        <div className="content">{children}</div>
      </div>
    );
  }
  else if(session){
    //console.log('firsttttt')
    return (
    <div className="d-flex">
       <Navbar/>
       {/* <Navbar2/> */}
       <div style={{margin:"40px 0 10px 320px",width:"100%"}}>{children}</div>
     </div> 
 ) 
  }else{
    return (
      <div className="d-flex">
         {/* <Navbar/> */}
         {/* <Navbar2/> */}
         {/* <div style={{margin:"40px 0 10px 320px",width:"100%"}}>{children}</div> */}
       </div> 
   ) 
  }

  

  // if(session) {
  //   return (
  //      <div class="d-flex">
  //         <Navbar/>
  //         {/* <Navbar2/> */}
  //         <div style={{margin:"40px 0 10px 320px",width:"100%"}}>{children}</div>
  //       </div> 
  //   ) 
  // }else{
  //   return router.push('/signin')
  // }
  
};

export default Layout;
