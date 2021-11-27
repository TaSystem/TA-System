import Link from "next/link";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDetailNisit } from "../redux/actions/nisitAction";
import ENGBadge from '../img/unnamed.jpg';
import Image from "next/image";
import styles from '../styles/navbar.module.css';

const Navbar = (props) => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (session) {
    var domain = String(session.user.email).substring(
      String(session.user.email).lastIndexOf("@") + 1
    );
    if (domain.includes("ku.th")) { //นิสิต
      return (
        <nav class="d-flex flex-column flex-shrink-0 p-3 text-white" style={{width:"280px",padding:"2vw",height:"calc(100vh - 0px)",position:"fixed",top:0,left:0,zIndex:1,background:"#7a0117"}} >
          <div style={{width:"280px",display:"flex",textAlign:"center"}}>
          <Link href="/nisit">
            <img src="https://www.eng.src.ku.ac.th/wp-content/uploads/2021/01/ENG_th-flat_transparent_1.png?x31307" alt="Engineering badge" style={{width:"80px",cursor:"pointer"}}   />
            </Link>
              <p class="text-white text-decoration-none" style={{margin:"0 0 0 1.5vw",fontWeight:600,fontSize:"45px",marginBlock:0,cursor:"none"  }}>SA</p>
          </div>
          <hr/>
          <ul class={`nav nav-pills flex-column mb-auto ${styles.sidebarHover}`} id="navbarNavAltMarkup" 
          
          >

              <Link href="/nisit">
                <a class={`nav-item nav-link text-white `} >รายวิชาที่เป็นSA </a>
              </Link>
              <Link href="/nisit/historyRequest">
                <a class="nav-item nav-link text-white">รายวิชาที่ยื่นขอ </a>
              </Link>
              <Link href="/nisit/requestTA">
                <a class="nav-item nav-link text-white">ลงทะเบียนSA </a>
              </Link>

              <Link href="/nisit/registerNisit">
                <a class="nav-item nav-link text-white">กรอกข้อมูลนิสิต </a>
              </Link>
              <Link href="/nisit/addBank">
                <a class="nav-item nav-link text-white">กรอกข้อมูลธนาคาร</a>
              </Link>
              <Link href="/nisit/profileNisit">
                <a class="nav-item nav-link text-white">กรอกข้อมูล</a>
              </Link>
              
              </ul>
              <hr/>
              <div class="d-flex align-items-center text-white text-decoration-none">
                <p class="flex-grow-1" aria-describedby="nameHelp" style={{fontSize:"13px",fontWeight:"500",marginBlockEnd:"0px"}}>{props.nisit.name && props.nisit.lastname?props.nisit.name+" "+props.nisit.lastname:props.nisit.name_email}{props.nisit.name && props.nisit.lastname?"":<small id="nameHelp" class="form-text text-muted"><br/>(โปรดกรอกข้อส่วนตัว)</small>}<p style={{fontSize:"10px",marginBlockEnd:"0px"}}><br/>ตำแหน่ง: {props.nisit.title}</p></p>
                <a style={{cursor:"pointer"}}onClick={() => signOut()}><img src="https://cdn-icons-png.flaticon.com/512/483/483343.png" style={{filter:"brightness(0) invert(1)",width:"20px"}} /></a>
              </div>
        </nav>
      );
    } else if (domain.includes("gmail")) {
      // console.log('props in nav ',props.roleID)
      if(props.nisit.roleID == 4){ //อาจารย์
        return (
          <nav class="d-flex flex-column flex-shrink-0 p-3 text-white" style={{width:"280px",padding:"2vw",height:"calc(100vh - 0px)",position:"fixed",top:0,left:0,zIndex:1,background:"#7a0117"}} >
          <div style={{width:"280px",display:"flex",textAlign:"center"}}>
          <Link href="/provost/provostCourses">
            <img src="https://www.eng.src.ku.ac.th/wp-content/uploads/2021/01/ENG_th-flat_transparent_1.png?x31307" alt="Engineering badge" style={{width:"80px",cursor:"pointer"}}   />
            </Link>
              <p class="text-white text-decoration-none" style={{margin:"0 0 0 1.5vw",fontWeight:600,fontSize:"45px",marginBlock:0,cursor:"none"}}>SA</p>
          </div>
          <hr/>
          <ul class="nav nav-pills flex-column mb-auto" id="navbarNavAltMarkup">
          <Link href="/provost/provostCourses">
                <a class="nav-item nav-link text-white">รายวิชาที่เปิดสอน</a>
              </Link>
              <Link href="/provost/provostCourseSuccess">
                <a class="nav-item nav-link text-white">รายวิชาที่เปิดรับSAได้ </a>
              </Link>
              <Link href="/provost/provostNisitRequest">
                <a class="nav-item nav-link text-white">คำร้องนิสิต </a>
              </Link>
              <Link href="/provost/provostHItoryApply">
                <a class="nav-item nav-link text-white">ประวัติยื่นคำร้อง </a>
              </Link>
              <Link href="/provost/profileProvost">
                <a class="nav-item nav-link text-white">กรอกข้อมูลส่วนตัว</a>
              </Link>
              </ul>
              <hr/>
              <div class="d-flex align-items-center text-white text-decoration-none">
                <p class="flex-grow-1" style={{fontSize:"13px",fontWeight:"500",marginBlockEnd:"0px"}}>{props.nisit.name && props.nisit.lastname?props.nisit.name+" "+props.nisit.lastname:props.nisit.name_email}{props.nisit.name && props.nisit.lastname?"":<small id="nameHelp" class="form-text text-muted"><br/>(โปรดกรอกข้อส่วนตัว)</small>}<p style={{fontSize:"10px",marginBlockEnd:"0px"}}><br/>ตำแหน่ง: {props.nisit.title}</p></p>
                <a style={{cursor:"pointer"}}onClick={() => signOut()}><img src="https://cdn-icons-png.flaticon.com/512/483/483343.png" style={{filter:"brightness(0) invert(1)",width:"20px"}} /></a>
              </div>
        </nav>
          // <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          //   <Link href="/provost/provostCourses">
          //     <a class="navbar-brand">SA</a>
          //   </Link>
          //   <button
          //     class="navbar-toggler"
          //     type="button"
          //     data-toggle="collapse"
          //     data-target="#navbarNavAltMarkup"
          //     aria-controls="navbarNavAltMarkup"
          //     aria-expanded="false"
          //     aria-label="Toggle navigation"
          //   >
          //     <span class="navbar-toggler-icon"></span>
          //   </button>
  
          //   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          //     <div class="navbar-nav"> 
          //       <Link href="/provost/provostCourses">
          //         <a class="nav-item nav-link">หน้าเเรก </a>
          //       </Link>
          //       <Link href="/provost/provostNisitRequest">
          //         <a class="nav-item nav-link">คำร้องนิสิต </a>
          //       </Link>
          //       <Link href="/provost/provostHItoryApply">
          //         <a class="nav-item nav-link">ประวัติยื่นคำร้อง </a>
          //       </Link>

          //       {/* <Link href="/nisit/requestTA">
          //       <a class="nav-item nav-link">ลงทะเบียนTA </a>
          //     </Link> */}
                
                    
                  
          //       <a class="nav-item nav-link" onClick={() => signOut()}>
          //         Sign Out
          //       </a>
          //       <a class="nav-item nav-link" style={{color:"red"}}>
          //         ตำแหน่ง: {props.nisit.title}
          //       </a>
          //       <a class="nav-item nav-link" style={{color:"red"}}>
          //         ชื่อ: {props.nisit.name_email} 
          //       </a>
          //     </div>
          //   </div>
          // </nav>
        );
      }
      else if(props.nisit.roleID == 3){//รองคณะบดี
        return (
          <nav class="d-flex flex-column flex-shrink-0 p-3 text-white" style={{width:"280px",padding:"2vw",height:"calc(100vh - 0px)",position:"fixed",top:0,left:0,zIndex:1,background:"#7a0117"}} >
          <div style={{width:"280px",display:"flex",textAlign:"center"}}>
          <Link href="/provost/provostCourses">
            <img src="https://www.eng.src.ku.ac.th/wp-content/uploads/2021/01/ENG_th-flat_transparent_1.png?x31307" alt="Engineering badge" style={{width:"80px",cursor:"pointer"}}   />
            </Link>
              <p class="text-white text-decoration-none" style={{margin:"0 0 0 1.5vw",fontWeight:600,fontSize:"45px",marginBlock:0,cursor:"none"}}>SA</p>
          </div>
          <hr/>
          <ul class="nav nav-pills flex-column mb-auto" id="navbarNavAltMarkup">
          <Link href="/provost/provostCourses">
                <a class="nav-item nav-link text-white">รายวิชาที่เปิดสอน </a>
              </Link>
              <Link href="/provost/provostCourseSuccess">
                <a class="nav-item nav-link text-white">รายวิชาที่เปิดรับSAได้ </a>
              </Link>
              <Link href="/provost/deputyDeanRequest">
                <a class="nav-item nav-link text-white">คำร้องอาจารย์ </a>
              </Link>
              <Link href="/provost/provostNisitRequest">
                <a class="nav-item nav-link text-white">คำร้องนิสิต </a>
              </Link>
              <Link href="/provost/provostHItoryApply">
                <a class="nav-item nav-link text-white">ประวัติยื่นคำร้อง </a>
              </Link>
              <Link href="/provost/dashboard">
                <a class="nav-item nav-link text-white">แดชบอร์ด </a>
              </Link>
              <Link href="/provost/profileProvost">
                <a class="nav-item nav-link text-white">กรอกข้อมูลส่วนตัว</a>
              </Link>
              
              </ul>
              <hr/>
              <div class="d-flex align-items-center text-white text-decoration-none">
                <p class="flex-grow-1" style={{fontSize:"13px",fontWeight:"500",marginBlockEnd:"0px"}}>{props.nisit.name && props.nisit.lastname?props.nisit.name+" "+props.nisit.lastname:props.nisit.name_email}{props.nisit.name && props.nisit.lastname?"":<small id="nameHelp" class="form-text text-muted"><br/>(โปรดกรอกข้อส่วนตัว)</small>}<p style={{fontSize:"10px",marginBlockEnd:"0px"}}><br/>ตำแหน่ง: {props.nisit.title}</p></p>
                <a style={{cursor:"pointer"}}onClick={() => signOut()}><img src="https://cdn-icons-png.flaticon.com/512/483/483343.png" style={{filter:"brightness(0) invert(1)",width:"20px"}} /></a>
              </div>
        </nav>
          // <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          //   <Link href="/provost/provostCourses">
          //     <a class="navbar-brand">SA</a>
          //   </Link>
          //   <button
          //     class="navbar-toggler"
          //     type="button"
          //     data-toggle="collapse"
          //     data-target="#navbarNavAltMarkup"
          //     aria-controls="navbarNavAltMarkup"
          //     aria-expanded="false"
          //     aria-label="Toggle navigation"
          //   >
          //     <span class="navbar-toggler-icon"></span>
          //   </button>
  
          //   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          //     <div class="navbar-nav"> 
          //       <Link href="/provost/provostCourses">
          //         <a class="nav-item nav-link">หน้าเเรก </a>
          //       </Link>
          //       <Link href="/provost/deputyDeanRequest">
          //         <a class="nav-item nav-link">คำร้องอาจารย์ </a>
          //       </Link>
          //       <Link href="/provost/provostNisitRequest">
          //         <a class="nav-item nav-link">คำร้องนิสิต </a>
          //       </Link>
          //       <Link href="/provost/provostHItoryApply">
          //         <a class="nav-item nav-link">ประวัติยื่นคำร้อง </a>
          //       </Link>
                
          //       <Link href="/provost/dashboard">
          //         <a class="nav-item nav-link">แดชบอร์ด </a>
          //       </Link>

          //       {/* <Link href="/nisit/requestTA">
          //       <a class="nav-item nav-link">ลงทะเบียนTA </a>
          //     </Link> */}
                
                    
                  
          //       <a class="nav-item nav-link" onClick={() => signOut()}>
          //         Sign Out
          //       </a>
          //       <a class="nav-item nav-link" style={{color:"red"}}>
          //         ตำแหน่ง: {props.nisit.title}
          //       </a>
          //       <a class="nav-item nav-link" style={{color:"red"}}>
          //         ชื่อ: {props.nisit.name_email} 
          //       </a>
          //     </div>
          //   </div>
          // </nav>
        );
      }
      else if(props.nisit.roleID == 2){//คณบดี
        return (
          <nav class="d-flex flex-column flex-shrink-0 p-3 text-white" style={{width:"280px",padding:"2vw",height:"calc(100vh - 0px)",position:"fixed",top:0,left:0,zIndex:1,background:"#7a0117"}} >
          <div style={{width:"280px",display:"flex",textAlign:"center"}}>
          <Link href="/provost/provostCourses">
            <img src="https://www.eng.src.ku.ac.th/wp-content/uploads/2021/01/ENG_th-flat_transparent_1.png?x31307" alt="Engineering badge" style={{width:"80px",cursor:"pointer"}}   />
            </Link>
              <p class="text-white text-decoration-none" style={{margin:"0 0 0 1.5vw",fontWeight:600,fontSize:"45px",marginBlock:0,cursor:"none"}}>SA</p>
          </div>
          <hr/>
          <ul class="nav nav-pills flex-column mb-auto" id="navbarNavAltMarkup">
              <Link href="/provost/provostCourses">
                <a class="nav-item nav-link text-white">รายวิชาที่เปิดสอน</a>
              </Link>
              <Link href="/provost/provostCourseSuccess">
                <a class="nav-item nav-link text-white">รายวิชาที่เปิดรับSAได้ </a>
              </Link>
              <Link href="/provost/provostNisitRequest">
                <a class="nav-item nav-link text-white">คำร้องนิสิต </a>
              </Link>
              <Link href="/provost/provostHItoryApply">
                <a class="nav-item nav-link text-white">ประวัติยื่นคำร้อง </a>
              </Link>
              <Link href="/provost/dashboard">
                <a class="nav-item nav-link text-white">แดชบอร์ด </a>
              </Link>
              <Link href="/provost/profileProvost">
                <a class="nav-item nav-link text-white">กรอกข้อมูลส่วนตัว</a>
              </Link>
              </ul>
              <hr/>
              <div class="d-flex align-items-center text-white text-decoration-none">
                <p class="flex-grow-1" style={{fontSize:"13px",fontWeight:"500",marginBlockEnd:"0px"}}>{props.nisit.name && props.nisit.lastname?props.nisit.name+" "+props.nisit.lastname:props.nisit.name_email}{props.nisit.name && props.nisit.lastname?"":<small id="nameHelp" class="form-text text-muted"><br/>(โปรดกรอกข้อส่วนตัว)</small>}<p style={{fontSize:"10px",marginBlockEnd:"0px"}}><br/>ตำแหน่ง: {props.nisit.title}</p></p>
                <a style={{cursor:"pointer"}}onClick={() => signOut()}><img src="https://cdn-icons-png.flaticon.com/512/483/483343.png" style={{filter:"brightness(0) invert(1)",width:"20px"}} /></a>
              </div>
        </nav>
          // <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          //   <Link href="/provost/provostCourses">
          //     <a class="navbar-brand">SA</a>
          //   </Link>
          //   <button
          //     class="navbar-toggler"
          //     type="button"
          //     data-toggle="collapse"
          //     data-target="#navbarNavAltMarkup"
          //     aria-controls="navbarNavAltMarkup"
          //     aria-expanded="false"
          //     aria-label="Toggle navigation"
          //   >
          //     <span class="navbar-toggler-icon"></span>
          //   </button>
  
          //   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          //     <div class="navbar-nav"> 
          //       <Link href="/provost/provostCourses">
          //         <a class="nav-item nav-link">หน้าเเรก </a>
          //       </Link>
          //       <Link href="/provost/provostNisitRequest">
          //         <a class="nav-item nav-link">คำร้องนิสิต </a>
          //       </Link>
          //       <Link href="/provost/dashboard">
          //         <a class="nav-item nav-link">แดชบอร์ด </a>
          //       </Link>
                
          //       <Link href="/provost/provostHItoryApply">
          //         <a class="nav-item nav-link">ประวัติยื่นคำร้อง </a>
          //       </Link>
                

          //       {/* <Link href="/nisit/requestTA">
          //       <a class="nav-item nav-link">ลงทะเบียนTA </a>
          //     </Link> */}
                
                    
                  
          //       <a class="nav-item nav-link" onClick={() => signOut()}>
          //         Sign Out
          //       </a>
          //       <a class="nav-item nav-link" style={{color:"red"}}>
          //         ตำแหน่ง: {props.nisit.title}
          //       </a>
                
          //       <a class="nav-item nav-link" style={{color:"red"}}>
          //         ชื่อ: {props.nisit.name_email} 
          //       </a>
          //     </div>
          //   </div>
          // </nav>
        );
      }
      
      else if (props.nisit.roleID == 1){//เจ้าหน้าที่
        return (
          <nav class="d-flex flex-column flex-shrink-0 p-3 text-white" style={{width:"280px",padding:"2vw",height:"calc(100vh - 0px)",position:"fixed",top:0,left:0,zIndex:1,background:"#7a0117"}} >
          <div style={{width:"280px",display:"flex",textAlign:"center"}}>
            <Link href="/provost">
            <img src="https://www.eng.src.ku.ac.th/wp-content/uploads/2021/01/ENG_th-flat_transparent_1.png?x31307" alt="Engineering badge" style={{width:"80px",cursor:"pointer"}}   />
            </Link>
              <p class="text-white text-decoration-none" style={{margin:"0 0 0 1.5vw",fontWeight:600,fontSize:"45px",marginBlock:0,cursor:"none"}}>SA</p>
          </div>
          <hr/>
          <ul class="nav nav-pills flex-column mb-auto" id="navbarNavAltMarkup">
          <button class="d-flex btn btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse0" aria-expanded="false" style={{color:"#fff",textAlign:"left",padding:"0.5rem 1rem"}}>
              <p class="flex-grow-1" style={{marginBottom:0}}>รายวิชา</p> <img src="https://cdn-icons-png.flaticon.com/512/151/151858.png" style={{filter:"brightness(0) invert(1)",width:"12px",marginTop:"7px"}} />
              </button>
              <div class="collapse" id="dashboard-collapse0">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{marginLeft:"15px",fontSize:"14px"}}>
                <Link href="/provost">
                <a class="nav-item nav-link text-white">รายวิชาทั้งหมด </a>
              </Link>
              <Link href="/provost/provostCourses">
                <a class="nav-item nav-link text-white">รายวิชาที่เปิดสอน </a>
              </Link>
              <Link href="/provost/provostCourseSuccess">
                <a class="nav-item nav-link text-white">รายวิชาที่เปิดรับSAได้ </a>
              </Link>
              <Link href="/provost/provostHItoryApply">
                <a class="nav-item nav-link text-white">รายวิชาทั้งหมดที่ยื่นขอSA </a>
              </Link>
                </ul>
              </div>
              
              <button class="d-flex btn btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse1" aria-expanded="false" style={{color:"#fff",textAlign:"left",padding:"0.5rem 1rem"}}>
              <p class="flex-grow-1" style={{marginBottom:0}}>คำร้องอาจารย์/ค่าใช้จ่าย</p> <img src="https://cdn-icons-png.flaticon.com/512/151/151858.png" style={{filter:"brightness(0) invert(1)",width:"12px",marginTop:"7px"}} />
              </button>
              <div class="collapse" id="dashboard-collapse1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{marginLeft:"15px",fontSize:"14px"}}>
                  <Link href="/provost/officerRequest">
                    <a class="nav-item nav-link text-white">คำร้องอาจารย์(เจ้าหน้าที่) </a>
                  </Link>
                  <Link href="/provost/headRequest">
                    <a class="nav-item nav-link text-white">คำร้องอาจารย์(หัวหน้าภาค) </a>
                  </Link>
                  <Link href="/provost/deputyDeanRequest">
                    <a class="nav-item nav-link text-white">คำร้องอาจารย์(รองคณบดี) </a>
                  </Link>
                  <Link href="/provost/officerApproveCost">
                    <a class="nav-item nav-link text-white">จัดทำเอกสารค่าใช้จ่าย(เจ้าหน้าที่) </a>
                  </Link>
                </ul>
              </div>
              <button class="d-flex btn btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse2" aria-expanded="false" style={{color:"#fff",textAlign:"left",padding:"0.5rem 1rem"}}>
              <p class="flex-grow-1" style={{marginBottom:0}}>คำร้องนิสิต/รายชื่อนิสิตSA</p> <img src="https://cdn-icons-png.flaticon.com/512/151/151858.png" style={{filter:"brightness(0) invert(1)",width:"12px",marginTop:"7px"}} />
              </button>
              <div class="collapse" id="dashboard-collapse2">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{marginLeft:"15px",fontSize:"14px"}}>
                <Link href="/provost/provostNisitRequest">
                <a class="nav-item nav-link text-white">คำร้องนิสิต(อาจารย์) </a>
              </Link>
              <Link href="/provost/officerNisitRequest">
                <a class="nav-item nav-link text-white">คำร้องนิสิต(เจ้าหน้าที่) </a>
              </Link>
              <Link href="/provost/officerSASuccess">
                <a class="nav-item nav-link text-white">รายชื่อนิสิตSA(เจ้าหน้าที่) </a>
              </Link>
                </ul>
              </div>
              
              
              <Link href="/provost/dashboard">
                <a class="nav-item nav-link text-white">แดชบอร์ด </a>
              </Link>
              <button class="d-flex btn btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse3" aria-expanded="false" style={{color:"#fff",textAlign:"left",padding:"0.5rem 1rem"}}>
              <p class="flex-grow-1" style={{marginBottom:0}}>ตั้งค่า</p> <img src="https://cdn-icons-png.flaticon.com/512/151/151858.png" style={{filter:"brightness(0) invert(1)",width:"12px",marginTop:"7px"}} />
              </button>
              <div class="collapse" id="dashboard-collapse3">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{marginLeft:"15px",fontSize:"14px"}}>
                <Link href="/provost/officerSystem">
                <a class="nav-item nav-link text-white">ตั้งค่าระบบ </a>
                </Link>
                <Link href="/provost/officerSetDate">
                  <a class="nav-item nav-link text-white">ตั้งค่าวันที่เรียน </a>
                </Link>
                <Link href="/provost/officerSetRole">
                  <a class="nav-item nav-link text-white">ตั้งค่าตำแหน่ง </a>
                </Link>
                </ul>
              </div>
              <Link href="/provost/profileProvost">
                <a class="nav-item nav-link text-white">กรอกข้อมูลส่วนตัว</a>
              </Link>
              </ul>
              <hr/>
              <div class="d-flex align-items-center text-white text-decoration-none">
                <p class="flex-grow-1" style={{fontSize:"13px",fontWeight:"500",marginBlockEnd:"0px"}}>{props.nisit.name && props.nisit.lastname?props.nisit.name+" "+props.nisit.lastname:props.nisit.name_email}{props.nisit.name && props.nisit.lastname?"":<small id="nameHelp" class="form-text text-muted"><br/>(โปรดกรอกข้อส่วนตัว)</small>}<p style={{fontSize:"10px",marginBlockEnd:"0px"}}><br/>ตำแหน่ง: {props.nisit.title}</p></p>
                <a style={{cursor:"pointer"}}onClick={() => signOut()}><img src="https://cdn-icons-png.flaticon.com/512/483/483343.png" style={{filter:"brightness(0) invert(1)",width:"20px"}} /></a>
              </div>
        </nav>
        // <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        //   <Link href="/provost">
        //     <a class="navbar-brand">SA</a>
        //   </Link>
        //   <button
        //     class="navbar-toggler"
        //     type="button"
        //     data-toggle="collapse"
        //     data-target="#navbarNavAltMarkup"
        //     aria-controls="navbarNavAltMarkup"
        //     aria-expanded="false"
        //     aria-label="Toggle navigation"
        //   >
        //     <span class="navbar-toggler-icon"></span>
        //   </button>

        //   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        //     <div class="navbar-nav">
        //     <Link href="/provost/dashboard">
        //         <a class="nav-item nav-link">dashboard</a>
        //       </Link>
        //       <Link href="/provost">
        //         <a class="nav-item nav-link">รายวิชาทั้งหมด </a>
        //       </Link>
        //       <Link href="/provost/provostCourses">
        //         <a class="nav-item nav-link">รายวิชาที่เปิดสอน </a>
        //       </Link>
        //       <Link href="/provost/officerRequest">
        //         <a class="nav-item nav-link">คำขออาจารย์ของเจ้าหน้าที่ </a>
        //       </Link>
        //       <Link href="/provost/headRequest">
        //         <a class="nav-item nav-link">คำขออาจารย์ของหัวหน้าภาค </a>
        //       </Link>
        //       <Link href="/provost/deputyDeanRequest">
        //         <a class="nav-item nav-link">คำขออาจารย์ของรองคณบดี </a>
        //       </Link>
        //       <Link href="/provost/officerApproveCost">
        //         <a class="nav-item nav-link">จัดทำเอกสารค่าใช้จ่าย</a>
        //       </Link>
        //       <Link href="/provost/officerCourseSuccess">
        //         <a class="nav-item nav-link">รายวิชาที่เปิดรับSAได้</a>
        //       </Link>
        //       <Link href="/provost/provostHItoryApply">
        //         <a class="nav-item nav-link">รายวิชาที่ยื่นขอSA </a>
        //       </Link>
        //       <Link href="/provost/provostNisitRequest">
        //         <a class="nav-item nav-link">รายชื่อนิสิตที่ขอ(อาจารย์) </a>
        //       </Link>
        //       <Link href="/provost/officerNisitRequest">
        //         <a class="nav-item nav-link">รายชื่อนิสิตที่ขอ(เจ้าหน้าที่) </a>
        //       </Link>
        //       <Link href="/provost/officerSASuccess">
        //         <a class="nav-item nav-link">นิสิตSA(เจ้าหน้าที่) </a>
        //       </Link>
        //       <Link href="/provost/officerSystem">
        //         <a class="nav-item nav-link">ตั้งค่าระบบ </a>
        //       </Link>
        //       <Link href="/provost/officerSetDate">
        //         <a class="nav-item nav-link">ตั้งค่าวัน </a>
        //       </Link>
        //       <Link href="/provost/officerSetRole">
        //         <a class="nav-item nav-link">ตั้งค่าตำแหน่ง</a>
        //       </Link>
        //       {/* <Link href="/nisit/requestTA">
        //       <a class="nav-item nav-link">ลงทะเบียนTA </a>
        //     </Link> */}
              
        //       <a class="nav-item nav-link" onClick={() => signOut()}>
        //         Sign Out
        //       </a>
        //       {/* <img src={props.nisit.imgURL} alt="" /> */}
        //       <a class="nav-item nav-link" style={{color:"red"}}>
        //           ตำแหน่ง: {props.nisit.title?props.nisit.title:"loading..."}
        //       </a>
        //       <a class="nav-item nav-link" style={{color:"red"}}>
        //           ชื่อ: {props.nisit.name_email?props.nisit.name_email:"loading..."} 
        //         </a>
        //     </div>
        //   </div>
        // </nav>
      );
      }
      else if(props.nisit.roleID >= 6){
        return (
          <nav class="d-flex flex-column flex-shrink-0 p-3 text-white" style={{width:"280px",padding:"2vw",height:"calc(100vh - 0px)",position:"fixed",top:0,left:0,zIndex:1,background:"#7a0117"}} >
          <div style={{width:"280px",display:"flex",textAlign:"center"}}>
          <Link href="/provost/provostCourses">
            <img src="https://www.eng.src.ku.ac.th/wp-content/uploads/2021/01/ENG_th-flat_transparent_1.png?x31307" alt="Engineering badge" style={{width:"80px",cursor:"pointer"}}   />
            </Link>
              <p class="text-white text-decoration-none" style={{margin:"0 0 0 1.5vw",fontWeight:600,fontSize:"45px",marginBlock:0,cursor:"none"}}>SA</p>
          </div>
          <hr/>
          <ul class="nav nav-pills flex-column mb-auto" id="navbarNavAltMarkup">
          <Link href="/provost/provostCourses">
                <a class="nav-item nav-link text-white">รายวิชาที่เปิดสอน </a>
              </Link>
              <Link href="/provost/provostCourseSuccess">
                <a class="nav-item nav-link text-white">รายวิชาที่เปิดรับSAได้ </a>
              </Link>
              <Link href="/provost/headRequest">
                <a class="nav-item nav-link text-white">คำร้องอาจารย์ </a>
              </Link>
              <Link href="/provost/provostNisitRequest">
                <a class="nav-item nav-link text-white">คำร้องนิสิต </a>
              </Link>
              <Link href="/provost/provostHItoryApply" >
                <a class="nav-item nav-link text-white">ประวัติยื่นคำร้อง </a>
              </Link>
              <Link href="/provost/profileProvost">
                <a class="nav-item nav-link text-white">กรอกข้อมูลส่วนตัว</a>
              </Link>
              </ul>
              <hr/>
              <div class="d-flex align-items-center text-white text-decoration-none">
                <p class="flex-grow-1" style={{fontSize:"13px",fontWeight:"500",marginBlockEnd:"0px"}}>{props.nisit.name && props.nisit.lastname?props.nisit.name+" "+props.nisit.lastname:props.nisit.name_email}{props.nisit.name && props.nisit.lastname?"":<small id="nameHelp" class="form-text text-muted"><br/>(โปรดกรอกข้อส่วนตัว)</small>}<p style={{fontSize:"10px",marginBlockEnd:"0px"}}><br/>ตำแหน่ง: {props.nisit.title}</p></p>
                <a style={{cursor:"pointer"}}onClick={() => signOut()}><img src="https://cdn-icons-png.flaticon.com/512/483/483343.png" style={{filter:"brightness(0) invert(1)",width:"20px"}} /></a>
              </div>
        </nav>
          // <div class="offcanvas offcanvas-start w-20 bg-dark" tabindex="-1" id="offcanvas" style={{width:"10vh"}} data-bs-keyboard="false" data-bs-backdrop="true">
          //   <div class="offcanvas-header">
          //   <Image src={ENGBadge} alt="Engineering badge" width={68} height={60} />
          //   <Link href="/provost/provostCourses" >
          //     <h2 class="offcanvas-title d-none d-sm-block text-white" id="offcanvas" style={{fontWeight:600,padding:"2vh"}}>SA</h2>
          //   </Link>
          //   <button type="button" class="btn-close btn-close-white text-reset " data-bs-dismiss="offcanvas" aria-label="Close"></button>
          //   </div>
  
          //   <div class="offcanvas-body px-0">
          //     <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start " id="menu">
          //     <li class="nav-item">
          //       <Link href="/provost/provostCourses" >
          //       <a class="nav-link text-truncate">
          //         <span class="ms-1 d-none d-sm-inline text-white" style={{fontWeight:600,fontSize:"1vw",padding:"3vh"}}>หน้าเเรก</span>
          //         </a>
          //       </Link>
          //     </li>
          //     <Link href="/provost/headRequest">
          //       <a class="nav-link text-truncate">
          //         <span class="ms-1 d-none d-sm-inline text-white"style={{fontWeight:600,fontSize:"1vw",padding:"3vh"}}>คำร้องอาจารย์</span>
          //         </a>
          //       </Link>
          //       <Link href="/provost/provostNisitRequest">
          //         <a class="nav-item nav-link">คำร้องนิสิต </a>
          //       </Link>
          //     <li class="mt-4">
          //       <Link href="/provost/provostHItoryApply" >
          //         <a class="nav-link text-truncate">
          //         <span class="ms-1 d-none d-sm-inline text-white"style={{fontWeight:600,fontSize:"1vw",padding:"3vh"}}>ประวัติยื่นคำร้อง</span>
          //         </a>
          //       </Link>
          //     </li>
          //     <li class="mt-4">
                
          //     </li>
                
                    
                  
          //       <li class="mt-4">
          //       <a class="nav-item nav-link" onClick={() => signOut()}>
          //       <span class="ms-1 d-none d-sm-inline text-white" style={{cursor:"pointer",fontWeight:600,fontSize:"1vw",padding:"3vh"}}>ออกจากระบบ</span>
          //       </a>
          //     </li>
          //     <div class="position-absolute bottom-0">
          //     <a class="nav-item nav-link " style={{color:"red"}}>
          //         ชื่อ: {props.nisit.name_email} 
          //       </a>
          //       <a class="nav-item nav-link " style={{color:"red"}}>
          //         ตำแหน่ง: {props.nisit.title}
          //       </a>
          //       </div>
          //     </ul>
          //   </div>
          // </div>
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
