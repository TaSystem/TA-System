import { signIn, signOut, useSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Axios from "../../config/Axios";
import { useRouter } from "next/router";

export default function index() {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    // async function getCourses() {
    if (session) {
      Axios.post("/courses/student-apply-success", {
        email: session.user.email,
      }).then((res) => {
        console.log("index Nisit : ", res.data , 'my email is ',session.user.email);
        setCourseList(res.data);
      });
    }
    // }
    // getCourses();
  }, [loading]);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    console.log("in that case");
    // router.push('/')
    return (
      <div>
        <h2>You aren't signed in, please sign in first</h2>
      </div>
    );
  }

  console.log("session in nisit ", session);

  return (
    <div className="container">
      <h1>รายวิชาที่เป็น TA (จำนวนชั่วโมงป.ตรี 10 ชม ป.โทไม่มีจำกัด)</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="ค้นหาข้อมูล..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="information">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">#</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th colSpan="2">เวลาเรียนบรรยาย</th>
              <th colSpan="2">เวลาเรียนปฎิบัติ</th>
              <th rowSpan="2">ระดับ</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
            </tr>
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
              <th>วัน</th>
              <th>เวลา</th>
              <th>วัน</th>
              <th>เวลา</th>
            </tr>
          </thead>
          <tbody>
            {courseList
              .filter((val) => {
                if (!search) {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                } else if (
                  val.courseID.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{val.courseID}</td>
                    <td>{val.title}</td>
                    <td>{val.sec_D ? val.sec_D : "-"}</td>
                    <td>{val.sec_P ? val.sec_P : "-"}</td>
                    <td>{val.day_D ? val.day_D : ""}</td>
                    <td>
                      {val.start_D ? val.start_D + " - " + val.end_D : ""}
                    </td>
                    <td>{val.day_P ? val.day_P : ""}</td>
                    <td>
                      {val.start_P ? val.start_P + " - " + val.end_P : ""}
                    </td>
                    <td>{val.level}</td>
                    <td>{val.major}</td>
                    <td>{val.teacher}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
