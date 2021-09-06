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
      if (course.level == level) {
        if (course.level == "ปริญญาตรี") {
          if (major == "All") return course;
          else if (course.major == major) {
            if (!search) {
              return course;
            } else if (
              course.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            } else if (
              course.courseID.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            }
          }
        } else if (course.level == "ปริญญาโท") {
          if (major == "All") return course;
          else if (course.major == major) {
            if (!search) {
              return course;
            } else if (
              course.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            } else if (
              course.courseID.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            }
          }
        }
      } else if (level == "All") {
        return course;
      }
    });
  }

  function ChangeDuo(e) {
    setLevel(e.target.value);
    setMajor("All");
  }
  async function replyTAsuccess(course) {
    await Axios.put("/reply/teacher-reply", {
      userID: 13,
      courseID: course,
      status: 2,
    }).then((response) => {
      setCourseList(response.data);
    });
  }
  async function replyTAfail(course) {
    await Axios.put("/reply/teacher-reply", {
      userID: 13,
      courseID: course,
      status: 5,
    }).then((response) => {
      setCourseList(response.data);
    });
  }
  //จำนวนที่ลงใส่หน้านี้

  return (
    <div className="container">
      <h1>รายวิชาที่ยื่นขอเปิดรับ TA (เจ้าหน้านที่)</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ค้นหาข้อมูล..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select name="year" onChange={ChangeDuo}>
          <option value="All" disabled selected hidden>
            ระดับ
          </option>
          <option value="ปริญญาตรี">ปริญญาตรี</option>
          <option value="ปริญญาโท">ปริญญาโท</option>
        </select>

        <select
          name="major"
          onChange={(e) => {
            setMajor(e.target.value);
          }}
        >
          <option value={null} disabled selected hidden>
            {level == "All" ? "เลือกระดับก่อน" : "เลือกสาขาของวิชา"}
          </option>
          {level === "ปริญญาตรี" && (
            <option value="All" disabled selected hidden>
              เลือกสาขาของวิชา
            </option>
          )}
          {level === "ปริญญาตรี" && (
            <option value="วิศวกรรมอุตสาหการและระบบ">
              วิศวกรรมอุตสาหการและระบบ(ป.ตรี)
            </option>
          )}
          {level === "ปริญญาตรี" && (
            <option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์">
              วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.ตรี)
            </option>
          )}
          {level === "ปริญญาตรี" && (
            <option value="วิศวกรรมโยธา">วิศวกรรมโยธา(ป.ตรี)</option>
          )}
          {level === "ปริญญาตรี" && (
            <option value="วิศวกรรมเครื่องกลและการออกแบบ">
              วิศวกรรมเครื่องกลและการออกแบบ(ป.ตรี)
            </option>
          )}
          {level === "ปริญญาตรี" && (
            <option value="วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์">
              วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์(ป.ตรี)
            </option>
          )}
          {level === "ปริญญาตรี" && (
            <option value="วิศวกรรมเครื่องกลและระบบการผลิต">
              วิศวกรรมเครื่องกลและระบบการผลิต(ป.ตรี)
            </option>
          )}
          {level === "ปริญญาตรี" && (
            <option value="วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ">
              วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ(ป.ตรี)
            </option>
          )}

          {level === "ปริญญาโท" && (
            <option value="ALl" disabled selected hidden>
              เลือกสาขาของวิชา
            </option>
          )}
          {level === "ปริญญาโท" && (
            <option value="วิศวกรรมความปลอดภัยและการจัดการสิ่งแวดล้อม">
              วิศวกรรมความปลอดภัยและการจัดการสิ่งแวดล้อม(ป.โท)
            </option>
          )}
          {level === "ปริญญาโท" && (
            <option value="การจัดการวิศวกรรมและเทคโนโลยี">
              การจัดการวิศวกรรมและเทคโนโลยี(ป.โท)
            </option>
          )}
          {level === "ปริญญาโท" && (
            <option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์">
              วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.โท)
            </option>
          )}
          {level === "ปริญญาโท" && (
            <option value="วิศวกรรมเครื่องกลและการออกแบบ">
              วิศวกรรมเครื่องกลและการออกแบบ(ป.โท)
            </option>
          )}
        </select>
      </div>
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
              <th rowSpan="2">ชื่อผู้ขอ</th>
              <th rowSpan="2">จำนวนที่ขอ</th>
              <th rowSpan="2">จำนวนชั่วโมง/สัปดาห์</th>
              <th rowSpan="2">ค่าใช้จ่าย</th>
              <th rowSpan="2">ตอบกลับ</th>
              
            </tr>
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
            </tr>
          </thead>
          <tbody>
            {Filter(courseList).map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />{" "}
                    {key + 1}
                  </td>
                  <td>{val.courseID}</td>
                  <td>{val.title}</td>
                  <td>{val.sec_D ? val.sec_D : "-"}</td>
                  <td>{val.sec_P ? val.sec_P : "-"}</td>
                  <td>{val.level}</td>
                  <td>{val.major}</td>
                  <td>{val.teacher}</td>
                  <td>{val.name_email} </td>
                  <td>{val.number}</td>
                  {val.sec_D && val.sec_P && <td>5</td>}
                  {val.sec_D && !val.sec_P && <td>2</td>}
                  {!val.sec_D && val.sec_P && <td>3</td>}
                  {val.sec_D && val.sec_P && (
                    <td>{val.number * 5 * 30 * 15}</td>
                  )}
                  {val.sec_D && !val.sec_P && (
                    <td>{val.number * 2 * 30 * 15}</td>
                  )}
                  {!val.sec_D && val.sec_P && (
                    <td>{val.number * 3 * 30 * 15}</td>
                  )}
                  <td>
                    <button
                      type="button"
                      class="btn btn-success"
                      onClick={()=>{if (window.confirm('ต้องการยืนยันวิชา: '+val.title))replyTAsuccess(val.id)}}
                    >
                      ยืนยัน
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={()=>{if (window.confirm('ต้องการยืนยันวิชา: '+val.title))replyTAfail(val.id)}}
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
