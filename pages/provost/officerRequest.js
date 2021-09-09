import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export default function OfficerRequest() {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [major, setMajor] = useState("All");
  const [level, setLevel] = useState("All");
  const [session, loading] = useSession();

  useEffect(() => {
    async function getCourses() {
      const response = await Axios.post("/courses/teacher-reply", {
        status: 1,
      });
      setCourseList(response.data);
    }
    getCourses();
  }, []);

  function Filter(courses) {
    return courses.filter((course) => {
      if (major == "All") {
        if (!search) {
          return course;
        } else if (course.title.toLowerCase().includes(search.toLowerCase())) {
          return course;
        } else if (
          course.courseID.toLowerCase().includes(search.toLowerCase())
        ) {
          return course;
        } else if (
          course.teacher.toLowerCase().includes(search.toLowerCase())
        ) {
          return course;
        }
      }
      else if (course.major == major) {
        if (!search) {
          return course;
        } else if (course.title.toLowerCase().includes(search.toLowerCase())) {
          return course;
        } else if (
          course.courseID.toLowerCase().includes(search.toLowerCase())
        ) {
          return course;
        } else if (
          course.teacher.toLowerCase().includes(search.toLowerCase())
        ) {
          return course;
        }
      }
    });
  }

  async function replyTAsuccess(course,AID) {
    await Axios.post("/reply/teacher-reply", {
      email:session.user.email,
      applyTaId:AID,
      courseID: course,
      status: 2,
    }).then((response) => {
      setCourseList(response.data);
    });
  }
  async function replyTAfail(course,AID) {
    await Axios.post("/reply/teacher-reply", {
      email:session.user.email,
      applyTaId:AID,
      courseID: course,
      status: 0,
    }).then((response) => {
      setCourseList(response.data);
    });
  }
  

  //จำนวนที่ลงใส่หน้านี้

  return (
    <div className="container">
      <h1>รายวิชาที่ยื่นขอเปิดรับ TA (เจ้าหน้าที่)</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          name="major"
          onChange={(e) => {
            setMajor(e.target.value);
          }}
        >
          <option value={null} disabled selected hidden>
            {level == "All" ? "เลือกระดับก่อน" : "เลือกสาขาของวิชา"}
          </option>
          <option value="All" disabled selected hidden>
            เลือกสาขาของวิชา
          </option>

          <option value="วิศวกรรมอุตสาหการและระบบ">
            วิศวกรรมอุตสาหการและระบบ(ป.ตรี)
          </option>

          <option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์">
            วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.ตรี)
          </option>

          <option value="วิศวกรรมโยธา">วิศวกรรมโยธา(ป.ตรี)</option>

          <option value="วิศวกรรมเครื่องกลและการออกแบบ">
            วิศวกรรมเครื่องกลและการออกแบบ(ป.ตรี)
          </option>

          <option value="วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์">
            วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์(ป.ตรี)
          </option>

          <option value="โครงการพิเศษคณะฯ">โครงการพิเศษคณะฯ(ป.ตรี)</option>
        </select>
      </div>
      <div className="information">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสคำขอ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">จำนวนที่รับ</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th rowSpan="2">อาจารย์ผู้ขอ</th>
              <th colSpan="2">จำนวนที่ขอ</th>
              <th rowSpan="2">จำนวนชั่วโมง/สัปดาห์</th>
              <th rowSpan="2">ค่าใช้จ่าย</th>
              <th rowSpan="2">เหตุผล</th>
              <th rowSpan="2">ตอบกลับ</th>
            </tr>
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
              <th>ป.ตรี</th>
              <th>ป.โท</th>
            </tr>
          </thead>
          <tbody>
            {Filter(courseList).map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.AID}</td>
                  <td>{val.courseID}</td>
                  <td>{val.title}</td>
                  <td>{val.sec_D ? val.sec_D : "-"}</td>
                  <td>{val.sec_P ? val.sec_P : "-"}</td>
                  <td>{val.major}</td>
                  <td>{val.number_D ? val.number_D : val.number_P}</td>
                  
                  <td>{val.teacher}</td>
                  <td>{val.name_email} </td>
                  <td>{val.number1}</td>
                  <td>{val.number2}</td>
                  {val.sec_D && val.sec_P && <td>5</td>}
                  {val.sec_D && !val.sec_P && <td>2</td>}
                  {!val.sec_D && val.sec_P && <td>3</td>}
                  {val.sec_D && val.sec_P && (
                    <td>
                      {val.number1 * 5 * 30 * 15 + val.number2 * 5 * 40 * 15}
                    </td>
                  )}
                  {val.sec_D && !val.sec_P && (
                    <td>
                      {val.number1 * 2 * 30 * 15 + val.number2 * 2 * 40 * 15}
                    </td>
                  )}
                  {!val.sec_D && val.sec_P && (
                    <td>
                      {val.number1 * 3 * 30 * 15 + val.number2 * 3 * 40 * 15}
                    </td>
                  )}
                  <td>{val.noteapply}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        if (window.confirm("ต้องการยืนยันวิชา: " + val.title))
                          replyTAsuccess(val.CID,val.AID);
                      }}
                    >
                      ยืนยัน
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        if (window.confirm("ต้องการยืนยันวิชา: " + val.title))
                          replyTAfail(val.CID,val.AID);
                      }}
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
