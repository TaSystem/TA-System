import { signIn, signOut, useSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Axios from "../../config/Axios";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";

function index(props) {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    // async function getCourses() {
    if (session) {
      Axios.get(`/courses/student-apply-success/${session.user.email}`)
      .then((res) => {
        console.log("index Nisit : ", res.data , 'my email is ',session.user.email);
        setCourseList(res.data);
      });
    }
    // }
    // getCourses();
  }, [loading]);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }
  }, [loading]);

  class Sumhour extends Array {
    sum(key) {
        return this.reduce((a, b) => a + (b[key] || 0), 0);
    }
  }
  const sumHour = new Sumhour(...courseList);

  function Filter(courses) {
    return courses.filter((course) => {
      if (!search) {
        return course;
      } else if (course.title.toLowerCase().includes(search.toLowerCase())) {
        return course;
      } else if (course.courseID.toLowerCase().includes(search.toLowerCase())) {
        return course;
      } else if (course.teacher.toLowerCase().includes(search.toLowerCase())) {
        return course;
      }
      
    });
  }

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
        placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="information">
       เวลาทำงานรวม: {courseList != null && courseList.length != 0 ? sumHour.sum('hrperweek') : 0} ชั่วโมง
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">#</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th colSpan="2">เวลาเรียน</th>
              <th rowSpan="2">ระดับ</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th rowSpan="2">เวลาทำงาน</th>
            </tr>
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
              
            </tr>
          </thead>
          <tbody>
            {Filter(courseList).map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{val.courseID}</td>
                    <td>{val.title}</td>
                    <td>{val.sec_D ? val.sec_D : "-"} </td>
                    <td>{val.sec_P ? val.sec_P : "-"}</td>
                    <td>{val.day_D ? val.day_D : ""} {val.start_D ? val.start_D + " - " + val.end_D : ""}</td>
                    
                    <td>{val.day_P ? val.day_P : ""} {val.start_P ? val.start_P + " - " + val.end_P : ""}</td>
                    
                    <td>{val.level}</td>
                    <td>{val.major}</td>
                    <td>{val.teacher}</td>
                    <td>{val.hrperweek}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);