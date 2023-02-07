import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import SelectMajor from "../../components/SelectMajor";
import Link from "next/link";
import ModalDetailTeacher from "../../components/ModalDetailTeacher";
import ModalCourse from "../../components/ModalCourse";

function DeputyDeanRequest(props) {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [major, setMajor] = useState("All");
  const [level, setLevel] = useState("All");
  const [session, loading] = useSession();
  const [teacherValue, setTeacherValue] = useState([]);
  const [success, setSuccess] = useState(null);
  const [yearNow, setYearNow] = useState([]);
  const [load, setLoad] = useState(false);
  const [courseValue, setCourseValue] = useState([]);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
    }
  }, [loading, props, session]);

  useEffect(() => {
    async function getCourses() {
      setLoad(true);
      const response = await Axios.get(`/courses/teacher-reply/${3}`);
      setCourseList(response.data);
      setLoad(false);
    }
    async function getYear() {
      const response = await Axios.get("/setdate/getNow");
      setYearNow(response.data);
    }
    getYear();
    getCourses();
  }, []);

  async function replyTAsuccess(course, AID) {
    await Axios.put("/reply/teacher-reply", {
      email: session.user.email,
      applyTaId: AID,
      courseID: course,
      status: 4,
    }).then((res) => {
      setCourseList(
        courseList.filter((val) => {
          return val.AID !== AID;
        })
      );
      setSuccess(res.data.message);
    });
  }
  async function replyTAfail(course, AID, title) {
    let notereply = prompt("เหตุผลที่ยกเลิกวิชา " + title);
    if (notereply != null) {
      await Axios.put("/reply/teacher-reply", {
        email: session.user.email,
        applyTaId: AID,
        courseID: course,
        status: 0,
        notereply: notereply,
      }).then((res) => {
        setCourseList(
          courseList.filter((val) => {
            return val.AID !== AID;
          })
        );
        setSuccess(res.data.message);
      });
    } else {
      console.log("");
    }
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
      } else if (course.major == major) {
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

  const TeacherapplyID = (id) => {
    let l = id.toString().length;
    if (l == 1) return "TR00000" + id;
    else if (l == 2) return "TR0000" + id;
    else if (l == 3) return "TR000" + id;
    else if (l == 4) return "TR00" + id;
    else if (l == 5) return "TR0" + id;
    else if (l == 6) return "TR" + id;
  };
  const showModalTeacher = (val) => {
    setTeacherValue({
      CID: val.CID,
      email: val.email,
      name_email: val.name_email,
      name: val.name,
      lastname: val.lastname,
      department: val.department,
      roleTitle: val.roleTitle,
      tel: val.tel,
    });
  };

  const showModalCourse = (val) => {
    setCourseValue({
      CID: val.CID,
      title: val.title,
      courseID: val.courseID,
      sec_D: val.sec_D,
      sec_P: val.sec_P,
      day_D: val.day_D,
      day_P: val.day_P,
      start_D: val.start_D,
      start_P: val.start_P,
      end_D: val.end_D,
      end_P: val.end_P,
      number_D: val.number_D,
      number_P: val.number_P,
      numberReal: val.numberReal,
      level: val.level,
      major: val.major,
      teacher: val.teacher,
    });
  };

  return (
    <div className="container">
      <h1>รายวิชาที่ยื่นขอเปิดรับ TA (รองคณบดี)</h1>
      <h3>
        ปี{" "}
        {yearNow != null && yearNow.length != 0
          ? yearNow[0].year
          : "loading..."}{" "}
        เทอม{" "}
        {yearNow != null && yearNow.length != 0
          ? yearNow[0].term
          : "loading..."}
      </h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
          onChange={(e) => setSearch(e.target.value)}
        />
        <SelectMajor
          onChange={(e) => {
            setMajor(e.target.value);
          }}
        />
      </div>
      {success && (
        <div className="alert alert-success" role="alert">
          {" "}
          {success}{" "}
        </div>
      )}
      จำนวนคำร้อง:{" "}
      {courseList != null && courseList.length != 0
        ? Filter(courseList).length
        : 0}
      <div
        className="table-responsive"
        style={{ maxHeight: "70vh", maxWidth: "80vw", marginTop: "1vh" }}
      >
        <table
          className="table table-hover table-bordered"
          cellSpacing="0"
          style={{ textAlign: "center" }}
        >
          <thead
            style={{
              position: "sticky",
              top: 0,
              background: "#7a0117",
              color: "#fff",
              fontWeight: "400",
            }}
          >
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสคำขอ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>

              <th rowSpan="2">ระดับ</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th rowSpan="2">ชื่อผู้ขอ</th>
              <th colSpan="2">จำนวนที่ขอ</th>
              <th rowSpan="2">เหตุผล</th>
              <th rowSpan="2">ตอบกลับ</th>
            </tr>
            <tr>
              <th>ป.ตรี</th>
              <th>ป.โท</th>
            </tr>
          </thead>
          <tbody>
            {Filter(courseList).map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{TeacherapplyID(val.AID)}</td>
                  <td>
                    <Link href="#">
                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#ModalCourse"
                        onClick={() => showModalCourse(val)}
                      >
                        {val.courseID}
                      </a>
                    </Link>
                  </td>
                  <td>{val.title}</td>

                  <td>{val.level}</td>
                  <td>{val.major}</td>
                  <td>{val.teacher}</td>
                  <td>
                    <Link href="#">
                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#ModalDetailTeacher"
                        onClick={() => showModalTeacher(val)}
                      >
                        {val.name} {val.lastname}
                      </a>
                    </Link>{" "}
                  </td>
                  <td>{val.number1}</td>
                  <td>{val.number2}</td>
                  <td>{val.noteapply}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        if (window.confirm("ต้องการยืนยันวิชา: " + val.title))
                          replyTAsuccess(val.CID, val.AID);
                      }}
                    >
                      ยืนยัน
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => replyTAfail(val.CID, val.AID, val.title)}
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              );
            })}
            {load && <h2 style={{ color: "red" }}>กำลังโหลด...</h2>}
            {!load && courseList && !courseList.length && (
              <h2 style={{ color: "red" }}>ไม่มีคำร้อง</h2>
            )}
          </tbody>
        </table>
        <ModalCourse val={courseValue} />
        <ModalDetailTeacher val={teacherValue} />
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
