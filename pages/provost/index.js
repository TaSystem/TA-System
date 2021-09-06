import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { signIn, signOut, useSession } from "next-auth/client";

export default function index() {
  const today = new Date();
  const [courses, setCourses] = useState([]);
  const [session, loading] = useSession();
  const [search, setSearch] = useState(null);
  const [yearSearch, setYearSearch] = useState([]);
  const [year, setYear] = useState(null);
  const [term, setTerm] = useState(null);
  const [major, setMajor] = useState(null);

  useEffect(() => {
    async function getCourses() {
      const response = await Axios.get("/courses");
      setCourses(response.data);
    }
    async function getYear() {
      const response = await Axios.get("/courses/year");
      setYearSearch(response.data);
    }
    getYear();
    getCourses();
  }, []);

  function ChangeDuo(e) {
    setLevel(e.target.value);
    setMajor("All");
  }

  function Filter(courses) {
    return courses.filter((course) => {
      if (major == "All") {
        if (year == "All") {
          if (term == "All") {
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
          else if(course.term == term){
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
          
        } else if (course.year == year) {
          if (term == "All") {
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
          else if(course.term == term){
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
      } else if (course.major == major) {
        if (year == "All") {
          if (term == "All") {
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
          else if(course.term == term){
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
          
        } else if (course.year == year) {
          if (term == "All") {
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
          else if(course.term == term){
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
      }
    });
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
      <h1>รายวิชาของเจ้าหน้าที่</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ค้นหาข้อมูล..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          name="year"
          onChange={(e) => {
            setYear(e.target.value);
          }}
        >
          <option value="All" disabled selected hidden>
            ปีการศึกษา
          </option>

          {yearSearch.map((val, key) => {
            return <option value={val.year}>{val.year}</option>;
          })}
        </select>

        <select
          name="term"
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        >
          <option value="All" disabled selected hidden>
            {year?"ภาคเรียน":"เลือกปีการศึกษาก่อน"}
          </option>
          <option value="ฤดูร้อน">ฤดูร้อน</option>
          <option value="ต้น">ต้น</option>
          <option value="ปลาย">ปลาย</option>
        </select>

        <select
          name="major"
          onChange={(e) => {
            setMajor(e.target.value);
          }}
        >
          <option value="All" disabled selected hidden>
          {term?"สาขาของวิชา":"เลือกภาคเรียนก่อน"}
            
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
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">รหัสวิชา-พ.ศ.หลักสูตร</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="11">บรรยาย</th>
              <th colSpan="10">ปฎิบัติ</th>
              <th rowSpan="2">อาจารย์</th>
              <th rowSpan="2">วิชาพื้นฐาน</th>
              <th rowSpan="2">จำนวนชั่วโมงที่จัดสอบ</th>
              <th colSpan="2">บรรยาย</th>
              <th colSpan="2">ปฎิบัติ</th>
              <th rowSpan="2">หมายเหตุ</th>
              <th rowSpan="2">สาขา</th>
            </tr>
            <tr>
              <th>หน่วยกิต</th>
              <th>หน่วย</th>
              <th>จำนวนชม.</th>
              <th>หมู่</th>
              <th>วัน</th>
              <th>เริ่ม</th>
              <th>-</th>
              <th>สิ้นสุด</th>
              <th>ห้อง</th>
              <th>สาขา</th>
              <th>จำนวน</th>

              <th>หน่วย</th>
              <th>จำนวนชม.</th>
              <th>หมู่</th>
              <th>วัน</th>
              <th>เริ่ม</th>
              <th>-</th>
              <th>สิ้นสุด</th>
              <th>ห้อง</th>
              <th>สาขา</th>
              <th>จำนวน</th>
              <th>ส่วนกลางจัดสอบ</th>
              <th>จัดสอบเองนอกตาราง</th>
              <th>ส่วนกลางจัดสอบ</th>
              <th>จัดสอบเองนอกตาราง</th>
            </tr>
          </thead>
          <tbody>
            {Filter(courses).map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.courseID}</td>
                  <td>{val.courseYear}</td>
                  <td>{val.title}</td>
                  <td>{val.credit}</td>
                  <td>{val.unit_D}</td>
                  <td>{val.hr_D}</td>
                  <td>{val.sec_D}</td>
                  <td>{val.day_D}</td>
                  <td>{val.start_D}</td>
                  <td>{val.dat1}</td>
                  <td>{val.end_D}</td>
                  <td>{val.room_D}</td>
                  <td>{val.major_D}</td>
                  <td>{val.number_D}</td>

                  <td>{val.unit_P}</td>
                  <td>{val.hr_P}</td>
                  <td>{val.sec_P}</td>
                  <td>{val.day_P}</td>
                  <td>{val.start_P}</td>
                  <td>{val.dat2}</td>
                  <td>{val.end_P}</td>
                  <td>{val.room_P}</td>
                  <td>{val.major_P}</td>
                  <td>{val.number_P}</td>
                  <td>{val.teacher}</td>
                  <td>{val.subjectBefore}</td>
                  <td>{val.testTime}</td>
                  <td>{val.central_M}</td>
                  <td>{val.decentral_M}</td>
                  <td>{val.central_F}</td>
                  <td>{val.decentral_F}</td>
                  <td>{val.note}</td>
                  <td>{val.major}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
