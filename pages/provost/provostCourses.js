import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import Modal from "../../components/ModalTeacher";
import { signIn, signOut, useSession } from "next-auth/client";


export default function coursesTeacher() {
 //ขอเลือกระดับได้
  const [courseList, setCourseList] = useState([]);
  const [value,setValue] = useState([]);
  const [search,setSearch] = useState(null);
  const [session, loading] = useSession();
  
  useEffect(() => {
    async function getCourses(){
        const response = await Axios.get("/courses");
        setCourseList(response.data)
    }
    getCourses(); 
  },[]);


  const showModal=(val)=>{
    setValue(val);
   }

   if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    console.log("in that case");
    return (
      <div>
        <h2>You aren't signed in, please sign in first</h2>
      </div>
    );
  }


  return (
    <div className="container">
      <h1>รายวิชาที่เปิดสอน</h1>
      <input type="text" className="form-control mb-3" placeholder="ค้นหาข้อมูล..." onChange={(e)=>setSearch(e.target.value)} />
      <div className="information">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th rowSpan="2">ระดับ</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th colSpan="2">จำนวนนิสิต</th>
              <th rowSpan="2">ดูข้อมูล</th>
              <th rowSpan="2">สถานะ</th>
              
            </tr>
            
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
              <th>รับ</th>
              <th>ลง</th>              
              
            </tr>
          </thead>
          <tbody>
            {courseList.filter((val)=>{
              if(!search){  
                return val;
              }else if(val.title.toLowerCase().includes(search.toLowerCase())){
                return val;
              }
              else if(val.courseID.toLowerCase().includes(search.toLowerCase())){
                return val;
              }
            }).map((val, key) => {
              return (
                
                <tr key={key}>
                  <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/> {key+1}</td>
                  <td>{val.courseID}</td>
                  <td>{val.title}</td>
                  <td>{val.sec_D?val.sec_D:"-"}</td>
                  <td>{val.sec_P?val.sec_P:"-"}</td>
                  <td>{val.level}</td>
                  <td>{val.major}</td>
                  <td>{val.teacher}</td>
                  <td>{val.number_P?val.number_P:val.number_D}</td>
                  <td>{val.numberReal?val.numberReal:0}</td>
                  <td>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>showModal(val)} >
                      ดูข้อมูล
                    </button>
                  </td>
                  {val.status?<td> <p style={{backgroundColor:"green",color:"white"}}>ขอTAได้</p> </td>:<td > <p style={{backgroundColor:"red",color:"white"}}>ขอTAไม่ได้</p> </td>}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal val={value} />
      </div>
      
    
    </div>
  );
}


