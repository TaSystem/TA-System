import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { useSession } from "next-auth/client";

export default function officerSetRole() {

  const [userList,setUserList] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await Axios.get("/users");
      setUserList(response.data);
    }
    getUsers();
  }, []);


  
  return (
    <div className="container">
      <h2>ตั้งค่าตำแหน่ง</h2>
      <div className="table-responsive">
      <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">อีเมลล์</th>
              <th rowSpan="2">ชื่ออีเมลล์</th>
              <th rowSpan="2">ชื่อ-สกุล</th>
              <th rowSpan="2">ภาควิชา</th>
              <th rowSpan="2">เบอร์โทรศัพท์</th>
              <th rowSpan="2">ตำแหน่ง</th>
              <th rowSpan="2">แก้ไข/ลบ</th>
              
            </tr>
          </thead>
          <tbody>
            {userList.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{val.email}</td>
                    <td>{val.name_email}</td>
                    <td>{val.name} {val.lastname}</td>
                    <td>{val.department}</td>
                    <td>{val.tel}</td>
                    <td>{val.title}</td>
                    <td>
                      <button type="button" className="btn btn-primary">แก้ไข</button>
                      <button type="button" className="btn btn-danger">ลบ</button>
                    </td>
                    
                  </tr>
                );
              })}
          </tbody>
        </table>
        <button type="button" className="btn btn-success">เพิ่มบุลลากร</button>
      </div>
      
    </div>
  );
}
