import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import SelectMajor from "../../components/SelectMajor";

function DeputyDeanRequest(props) {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [major, setMajor] = useState("All");
  const [level, setLevel] = useState("All");
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);
  
  useEffect(() => {
    async function getCourses() {
      const response = await Axios.post("/courses/teacher-reply", {
        status: 3,
      });
      setCourseList(response.data);
    }
    getCourses();
  }, []);

  async function replyTAsuccess(course,AID) {
    await Axios.put("/reply/teacher-reply", {
      email:session.user.email,
      applyTaId:AID,
      courseID: course,
      status: 4,
    }).then((response) => {
      setCourseList(response.data);
    });
  }
  async function replyTAfail(course,AID) {
    await Axios.put("/reply/teacher-reply", {
      email:session.user.email,
      applyTaId:AID,
      courseID: course,
      status: 0,
    }).then((response) => {
      setCourseList(response.data);
    });
  }

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

  function ChangeDuo(e) {
    setLevel(e.target.value);
    setMajor("All");
  }
  function action(params) {
      
  }

  return (
    <div className="container">
      <h1>รายวิชาที่ยื่นขอเปิดรับ TA (รองอธิการบดี)</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
          onChange={(e) => setSearch(e.target.value)}
        />
        <SelectMajor onChange={(e) => {
            setMajor(e.target.value);
          }}/>
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
              <th colSpan="2">จำนวนที่ขอ</th>
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
                  <td>{val.number1}</td>
                  <td>{val.number2}</td>
                  <td>{val.noteapply}</td>
                  
                  <td>
                    <button
                      type="button"
                      class="btn btn-success"
                      onClick={()=>{if (window.confirm('ต้องการยืนยันวิชา: '+val.title))replyTAsuccess(val.CID,val.AID)}}
                      
                    >
                      ยืนยัน
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={()=>{if (window.confirm('ต้องการยกเลิกวิชา: '+val.title))replyTAfail(val.CID,val.AID)}}
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
const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeputyDeanRequest);
