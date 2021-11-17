import Link from "next/link";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDetailNisit } from "../redux/actions/nisitAction";
import ENGBadge from '../img/unnamed.jpg';
import Image from "next/image";


const Navbar = (props) => {
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

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{padding:"2vh"}} >
            <Image src={ENGBadge} alt="Engineering badge" width={40} height={35} />
          <Link href="/nisit">
              <a class="navbar-brand" style={{padding:"1vh",fontWeight:600,fontSize:"2vw"}}>SA</a>
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
                <a class="nav-item nav-link">รายวิชาที่เป็น TA </a>
              </Link>
              <Link href="/nisit/requestTA">
                <a class="nav-item nav-link">ลงทะเบียนTA </a>
              </Link>

              <a class="nav-item nav-link" onClick={() => signOut()}>
                Sign Out
              </a>
              <a class="nav-item nav-link" style={{color:"red"}}>
                  ตำแหน่ง: {props.nisit.title}
              </a>
              <a class="nav-item nav-link" style={{color:"red"}}>
                  ชื่อ: {props.nisit.name_email} 
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
      // console.log('props in nav ',props.roleID)
      if(props.nisit.roleID == 4){
        return (
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
                <Link href="/provost/provostCourses">
                  <a class="nav-item nav-link">หน้าเเรก </a>
                </Link>
                <Link href="/provost/provostHItoryApply">
                  <a class="nav-item nav-link">ประวัติยื่นคำร้อง </a>
                </Link>
                <Link href="/provost/nisitRequest">
                  <a class="nav-item nav-link">คำร้องนิสิต </a>
                </Link>

                {/* <Link href="/nisit/requestTA">
                <a class="nav-item nav-link">ลงทะเบียนTA </a>
              </Link> */}
                
                    
                  
                <a class="nav-item nav-link" onClick={() => signOut()}>
                  Sign Out
                </a>
                <a class="nav-item nav-link" style={{color:"red"}}>
                  ตำแหน่ง: {props.nisit.title}
                </a>
                <a class="nav-item nav-link" style={{color:"red"}}>
                  ชื่อ: {props.nisit.name_email} 
                </a>
              </div>
            </div>
          </nav>
        );
      }
      else if(props.nisit.roleID == 3){
        return (
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
                <Link href="/provost/provostCourses">
                  <a class="nav-item nav-link">หน้าเเรก </a>
                </Link>
                <Link href="/provost/provostHItoryApply">
                  <a class="nav-item nav-link">ประวัติยื่นคำร้อง </a>
                </Link>
                <Link href="/provost/deputyDeanRequest">
                  <a class="nav-item nav-link">คำร้องนิสิต </a>
                </Link>

                {/* <Link href="/nisit/requestTA">
                <a class="nav-item nav-link">ลงทะเบียนTA </a>
              </Link> */}
                
                    
                  
                <a class="nav-item nav-link" onClick={() => signOut()}>
                  Sign Out
                </a>
                <a class="nav-item nav-link" style={{color:"red"}}>
                  ตำแหน่ง: {props.nisit.title}
                </a>
                <a class="nav-item nav-link" style={{color:"red"}}>
                  ชื่อ: {props.nisit.name_email} 
                </a>
              </div>
            </div>
          </nav>
        );
      }
      else if(props.nisit.roleID == 2){
        return (
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
                <Link href="/provost/provostCourses">
                  <a class="nav-item nav-link">หน้าเเรก </a>
                </Link>
                <Link href="/provost/provostHItoryApply">
                  <a class="nav-item nav-link">ประวัติยื่นคำร้อง </a>
                </Link>
                <Link href="/provost/nisitRequest">
                  <a class="nav-item nav-link">คำร้องนิสิต </a>
                </Link>

                {/* <Link href="/nisit/requestTA">
                <a class="nav-item nav-link">ลงทะเบียนTA </a>
              </Link> */}
                
                    
                  
                <a class="nav-item nav-link" onClick={() => signOut()}>
                  Sign Out
                </a>
                <a class="nav-item nav-link" style={{color:"red"}}>
                  ตำแหน่ง: {props.nisit.title}
                </a>
                <a class="nav-item nav-link" style={{color:"red"}}>
                  ชื่อ: {props.nisit.name_email} 
                </a>
              </div>
            </div>
          </nav>
        );
      }
      
      else if (props.nisit.roleID == 1){
        return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link href="/provost">
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
            <Link href="/provost/dashboard">
                <a class="nav-item nav-link">dashboard</a>
              </Link>
              <Link href="/provost">
                <a class="nav-item nav-link">รายวิชาทั้งหมด </a>
              </Link>
              <Link href="/provost/provostCourses">
                <a class="nav-item nav-link">รายวิชาที่เปิดสอน </a>
              </Link>
              <Link href="/provost/officerRequest">
                <a class="nav-item nav-link">คำขออาจารย์ของเจ้าหน้าที่ </a>
              </Link>
              <Link href="/provost/headRequest">
                <a class="nav-item nav-link">คำขออาจารย์ของหัวหน้าภาค </a>
              </Link>
              <Link href="/provost/deputyDeanRequest">
                <a class="nav-item nav-link">คำขออาจารย์ของรองคณบดี </a>
              </Link>
              <Link href="/provost/officerApproveCost">
                <a class="nav-item nav-link">จัดทำเอกสารค่าใช้จ่าย</a>
              </Link>
              <Link href="/provost/officerCourseSuccess">
                <a class="nav-item nav-link">รายวิชาที่เปิดรับSAได้</a>
              </Link>
              <Link href="/provost/provostHItoryApply">
                <a class="nav-item nav-link">รายวิชาที่ยื่นขอSA </a>
              </Link>
              <Link href="/provost/provostNisitRequest">
                <a class="nav-item nav-link">รายชื่อนิสิตที่ขอ(อาจารย์) </a>
              </Link>
              <Link href="/provost/officerNisitRequest">
                <a class="nav-item nav-link">รายชื่อนิสิตที่ขอ(เจ้าหน้าที่) </a>
              </Link>
              <Link href="/provost/officerSASuccess">
                <a class="nav-item nav-link">นิสิตSA(เจ้าหน้าที่) </a>
              </Link>
              <Link href="/provost/officerSystem">
                <a class="nav-item nav-link">ตั้งค่าระบบ </a>
              </Link>
              <Link href="/provost/officerSetDate">
                <a class="nav-item nav-link">ตั้งค่าวัน </a>
              </Link>
              <Link href="/provost/officerSetRole">
                <a class="nav-item nav-link">ตั้งค่าตำแหน่ง</a>
              </Link>
              {/* <Link href="/nisit/requestTA">
              <a class="nav-item nav-link">ลงทะเบียนTA </a>
            </Link> */}
              
              <a class="nav-item nav-link" onClick={() => signOut()}>
                Sign Out
              </a>
              {/* <img src={props.nisit.imgURL} alt="" /> */}
              <a class="nav-item nav-link" style={{color:"red"}}>
                  ตำแหน่ง: {props.nisit.title?props.nisit.title:"loading..."}
              </a>
              <a class="nav-item nav-link" style={{color:"red"}}>
                  ชื่อ: {props.nisit.name_email?props.nisit.name_email:"loading..."} 
                </a>
            </div>
          </div>
        </nav>
      );
      }
      else if(props.nisit.roleID >= 6){
        return (
          <div class="offcanvas offcanvas-start w-20 bg-dark" tabindex="-1" id="offcanvas" style={{width:"10vh"}} data-bs-keyboard="false" data-bs-backdrop="true">
            <div class="offcanvas-header">
            <Image src={ENGBadge} alt="Engineering badge" width={68} height={60} />
            <Link href="/provost/provostCourses" >
              <h2 class="offcanvas-title d-none d-sm-block text-white" id="offcanvas" style={{fontWeight:600,padding:"2vh"}}>SA</h2>
            </Link>
            <button type="button" class="btn-close btn-close-white text-reset " data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
  
            <div class="offcanvas-body px-0">
              <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start " id="menu">
              <li class="nav-item">
                <Link href="/provost/provostCourses" >
                <a class="nav-link text-truncate">
                  <span class="ms-1 d-none d-sm-inline text-white" style={{fontWeight:600,fontSize:"1vw",padding:"3vh"}}>หน้าเเรก</span>
                  </a>
                </Link>
              </li>
              <li class="mt-4">
                <Link href="/provost/provostHItoryApply" >
                  <a class="nav-link text-truncate">
                  <span class="ms-1 d-none d-sm-inline text-white"style={{fontWeight:600,fontSize:"1vw",padding:"3vh"}}>ประวัติยื่นคำร้อง</span>
                  </a>
                </Link>
              </li>
              <li class="mt-4">
                <Link href="/provost/headRequest">
                <a class="nav-link text-truncate">
                  <span class="ms-1 d-none d-sm-inline text-white"style={{fontWeight:600,fontSize:"1vw",padding:"3vh"}}>คำร้องนิสิต</span>
                  </a>
                </Link>
              </li>
                
                    
                  
                <li class="mt-4">
                <a class="nav-item nav-link" onClick={() => signOut()}>
                <span class="ms-1 d-none d-sm-inline text-white" style={{cursor:"pointer",fontWeight:600,fontSize:"1vw",padding:"3vh"}}>ออกจากระบบ</span>
                </a>
              </li>
              <div class="position-absolute bottom-0">
              <a class="nav-item nav-link " style={{color:"red"}}>
                  ชื่อ: {props.nisit.name_email} 
                </a>
                <a class="nav-item nav-link " style={{color:"red"}}>
                  ตำแหน่ง: {props.nisit.title}
                </a>
                </div>
              </ul>
            </div>
          </div>
        );
      }
      else{
        return(
          <div>
            loading...
          </div>
        )
      }
      
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

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
