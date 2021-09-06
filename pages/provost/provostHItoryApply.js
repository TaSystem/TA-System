import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export default function provostHItoryApply() {
  const [session, loading] = useSession();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function getCourses(){
        const response = await Axios.get("/courses/teacher-apply");
        setCourses(response.data)
    }
    getCourses(); 
  },[]);

  const condition=(status)=>{
    if(status === 1){
      return <td><p style={{backgroundColor:"#E3E726",color:"white"}}>รอดำเนินการจากเจ้าหน้าที</p> </td>
    }
    else if(status === 2){
      return <td><p style={{backgroundColor:"#E3E726",color:"white"}}>รอดำเนินการจากหัวหน้าภาค</p> </td>
    }
    else if(status === 3){
        return <td><p style={{backgroundColor:"#E3E726",color:"white"}}>รอดำเนินการจากรองคณบดี</p> </td>
    }
    else if(status === 4){
        return <td><p style={{backgroundColor:"#0E7ADD",color:"white"}}>ขอTAสำเร็จ</p> </td>
    }
    else{
      return <td><p style={{backgroundColor:"#DD0E0E",color:"white"}}>ขอTAไม่ผ่าน</p> </td>
    }
  }

  return (
    <div className="container">
      <h1>รายวิชาที่ยื่นขอ</h1>
      <div className="information">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รหัสวิชา</th>
              <th>ชื่อวิชา</th>
              <th>ระดับ</th>
              <th>สาขาวิชา</th>
              <th>จำนวนที่ขอ</th>
              <th>สถานะ</th>

            </tr>
          </thead>
          <tbody>
            {courses.map((val, key) => {
              return (
                <tr>
                  <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/> {key+1}</td>
                  <td>{val.courseID}</td>
                  <td>{val.title}</td>
                  <td>{val.level}</td>
                  <td>{val.major}</td>
                  <td>{val.number}</td>
                  <td>{condition(val.status)}</td>
                  

                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

