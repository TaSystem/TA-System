import Link from "next/link";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDetailNisit } from "../redux/actions/nisitAction";

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
            <Link href="/provost/dashBoard">
                <a class="nav-item nav-link">dashBoard</a>
              </Link>
              <Link href="/provost/coursesImport">
                <a class="nav-item nav-link">เพิ่มรายวิชาที่เปิดสอน </a>
              </Link>
              <Link href="/provost/provostCourses">
                <a class="nav-item nav-link">รายวิชาที่เปิดสอน </a>
              </Link>
              <Link href="/provost/officerRequest">
                <a class="nav-item nav-link">คำขออาจารย์ของเจ้าหน้าที่ </a>
              </Link>
              <Link href="/provost/headRequest">
                <a class="nav-item nav-link">คำขอนิสิตของหัวหน้าภาค </a>
              </Link>
              <Link href="/provost/deputyDeanRequest">
                <a class="nav-item nav-link">คำขอนิสิตของรองคณบดี </a>
              </Link>
              <Link href="/provost/officerApproveCost">
                <a class="nav-item nav-link">จัดทำเอกสารอนุมัติหลักการ</a>
              </Link>
              <Link href="/provost/provostHItoryApply">
                <a class="nav-item nav-link">รายวิชาที่ยื่นขอTA </a>
              </Link>
              <Link href="/provost/nisitRequest">
                <a class="nav-item nav-link">รายชื่อนิสิตที่ขอ </a>
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
