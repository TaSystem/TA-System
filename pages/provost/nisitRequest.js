import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { signIn, signOut, useSession } from "next-auth/client";

export default function historyReqest() {
  const [courses, setCourses] = useState([]);
  const [session, loading] = useSession();

  useEffect(() => {
    async function getCourses() {
      const response = await Axios.get("/courses/student-reply");
      setCourses(response.data);
    }
    getCourses();
  }, []);

  const replyTAsuccess = async (userID,courseID) => {
    await Axios.put("/reply/student-reply", {
      userID: userID,
      courseID: courseID,
      status: 2,
    }).then((res) => {
      console.log(res.data);
      setCourses(res.data);
    });
  };

  const replyTAfail = async (userID,courseID) => {
    await Axios.put("/reply/student-reply", {
      userID: userID,
      courseID: courseID,
      status: 3,
    }).then((res) => {
      console.log(res.data);
      setCourses(res.data);
    });
  };

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
      <h1>รายวิชาที่ยื่นขอ</h1>
      <div className="information">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th rowSpan="2">ระดับ</th>
              <th colSpan="2">หมู่เรียน</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">ชื่อผู้ยื่น</th>
              <th rowSpan="2">เหตุผล</th>
              <th rowSpan="2">ตอบกลับคำร้อง</th>
            </tr>
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((val, key) => {
              return (
                <tr>
                  <td>{key + 1}</td>
                  <td>{val.courseID}</td>
                  <td>{val.title}</td>
                  <td>{val.level}</td>
                  <td>{val.sec_D ? val.sec_D : "-"}</td>
                  <td>{val.sec_P ? val.sec_P : "-"}</td>
                  <td>{val.major}</td>
                  <td>{val.name_email}</td>
                  <td>{val.note}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-success"
                      key={key}
                      onClick={() => {if (window.confirm('ต้องการยืนยันวิชา: '+val.title))replyTAsuccess(val.userID,val.id)}}
                      
                    >
                      ยืนยัน
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      key={key}
                      onClick={() => {if (window.confirm('ต้องการยืนยันวิชา: '+val.title))replyTAfail(val.userID,val.id)} }
                      
                    >
                      ยกเลิก
                    </button>
                  </td>
                  <td>{val.userID}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
