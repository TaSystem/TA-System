import { signIn, signOut, useSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ModalCourse from "../../../components/ModalCourse";
import SelectMajor from "../../../components/SelectMajor";
import Axios from "../../../config/Axios";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getDetailNisit } from "../../../redux/actions/nisitAction";
import ExportNisitSA from "../../../components/form/ApplicationNisitSA";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";

const SASuccess = (props) => {
  const componentRef = React.useRef();
  const [courseList, setCourseList] = useState([]);
  const [yearNow, setYearNow] = useState([]);
  const [session, loading] = useSession();
  const [search, setSearch] = useState(null);
  const [major, setMajor] = useState("All");
  const [data, setData] = useState({});
  const [courseValue, setCourseValue] = useState([]);
  const router = useRouter();
  const { id } = router.query;


  useEffect(() => {
    if (session) {
      Axios.get(`/courses/student-request-success/${id}`).then((res) => {
        // console.log("index Nisit : ", res.data , 'my email is ',session.user.email);
        setCourseList(res.data);
      });
      async function getYear() {
        const response = await Axios.get("/setdate/getNow");
        setYearNow(response.data);
      }
      getYear();
    }
    // }
    // getCourses();
  }, [id, loading, session]);
  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
    }
  }, [loading, props, session]);

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

  class Sumhour extends Array {
    sum(key) {
      return this.reduce((a, b) => a + (b[key] || 0), 0);
    }
  }
  const sumHour = new Sumhour(...Filter(courseList));

  const showSec = (sec_P) => {
    let arraySec = sec_P.split("_");
    return arraySec.map((val, index) => {
      if (arraySec.length == index + 1) {
        return <>{val}</>;
      } else {
        return <>{val},</>;
      }
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

  function CustomFilter(courses, major) {
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

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    // console.log("in that case");
    // router.push('/')
    return (
      <div>
        <h2>You aren&apos;t signed in, please sign in firstsss</h2>
      </div>
    );
  }

  // console.log("session in nisit ", session);

  return (
    <div className="container">
      <h1>รายวิชาที่เป็น SA </h1>
      <h2>
        ปี{" "}
        {yearNow != null && yearNow.length != 0
          ? yearNow[0].year
          : "loading..."}{" "}
        เทอม{" "}
        {yearNow != null && yearNow.length != 0
          ? yearNow[0].term
          : "loading..."}{" "}
      </h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
          onChange={(e) => setSearch(e.target.value)}
        />
        {console.log("year = ", yearNow)}
        <SelectMajor
          onChange={(e) => {
            // mark1
            setMajor(e.target.value);
            console.log("set = ", e.target.value);
            console.log("courseList = ", courseList);
            const listFilters = CustomFilter(courseList, e.target.value);
            console.log("filter = ", listFilters);
            let count = 1;
            const tableDatas = [];

            // secD
            listFilters.map((listFilter) => {
              console.log("check1 = ", listFilter?.sec_D);
              console.log("check2 = ", listFilter?.sec_P);
              if (
                listFilter?.sec_D?.length !== 0 &&
                listFilter?.sec_P?.length === 0
              ) {
                tableDatas.push({
                  number: count,
                  courseId: listFilter.courseID,
                  subjectName: listFilter.title,
                  sec: listFilter.sec_D,
                  day: listFilter.day_D,
                  time: `${listFilter.start_D}-${listFilter.end_D}`,
                  hrperweek: `${listFilter.hrperweek}`,
                });
              }
              // secP
              else if (
                listFilter.sec_D.length === 0 &&
                listFilter.sec_P.length !== 0
              ) {
                tableDatas.push({
                  number: count,
                  courseId: listFilter.courseID,
                  subjectName: listFilter.title,
                  sec: listFilter.sec_P,
                  day: listFilter.day_P,
                  time: `${listFilter.start_P}-${listFilter.end_P}`,
                  hrperweek: `${listFilter.hrperweek}`,
                });
              }
              // secD& secP
              else if (
                listFilter.sec_D.length !== 0 &&
                listFilter.sec_P.length !== 0
              ) {
                tableDatas.push({
                  number: count,
                  courseId: listFilter.courseID,
                  subjectName: listFilter.title,
                  sec: listFilter.sec_D,
                  day: listFilter.day_D,
                  time: `${listFilter.start_D}-${listFilter.end_D}`,
                  hrperweek: `${listFilter.hrperweek}`,
                });

                tableDatas.push({
                  number: "",
                  courseId: "",
                  subjectName: "",
                  sec: listFilter.sec_P,
                  day: listFilter.day_P,
                  time: `${listFilter.start_P}-${listFilter.end_P}`,
                  // hrperweek:`${listFilter.hrperweek}`
                });
              }
              count++;
            });

            console.log("table = ", tableDatas);
            setData({
              name: props.nisit.name,
              idStudent: props.nisit.idStudent,
              departmentNisitNisit: props.nisit.department,
              tel: props.nisit.tel,
              bank: props.nisit.nameBank,
              accountNumber: props.nisit.idBank,
              year: yearNow[0].year,
              term: yearNow[0].term,
              department: e.target.value,
              nisitYear: (
                parseInt(yearNow[0].year.toString().slice(2)) -
                parseInt(props.nisit.idStudent.slice(0, 2)) +
                1
              ).toString(),
              tableDatas: tableDatas,
            });
          }}
        />
      </div>
      <div style={{ margin: "12px auto" }}>
        {JSON.stringify(data) !== "{}" ? (
          <ReactToPrint
            trigger={() => (
              <button type="submit" className="btn btn-danger">
                ดาวโหลดใบสมัครนิสิตช่วยปฎิบัติงาน (PDF)
              </button>
            )}
            content={() => componentRef.current}
          />
        ) : (
          <button
            className="btn btn-danger"
            disabled
            onClick={() => {
              alert("กรุณาเลือกสาขา");
            }}
          >
            เลือกสาขาเพื่อดาวโหลดใบสมัครนิสิตช่วยปฎิบัติงาน
          </button>
        )}
      </div>
      <div style={{ display: "none" }}>
        <ExportNisitSA ref={componentRef} {...data} />
      </div>
      จำนวน:
      {courseList != null && courseList.length != 0
        ? Filter(courseList).length
        : 0}{" "}
      วิชา &emsp; เวลาทำงานรวม:{" "}
      {courseList != null && courseList.length != 0
        ? sumHour.sum("hrperweek")
        : 0}{" "}
      ชั่วโมง
      <div
        className="table-responsive"
        style={{ maxHeight: "65vh", maxWidth: "80vw", marginTop: "1vh" }}
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
              <th rowSpan="2">#</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>

              <th rowSpan="2">ระดับ</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th rowSpan="2">เวลาทำงาน</th>
              <th rowSpan="2">ปริ้นใบเช็คชื่อ</th>
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
                  <td>{key + 1}</td>
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
                  <td>{val.sec_D ? val.sec_D : "-"} </td>
                  <td>{val.sec_P ? showSec(val.sec_P) : "-"}</td>

                  <td>{val.level}</td>
                  <td>{val.major}</td>
                  <td>{val.teacher}</td>
                  <td>{val.hrperweek}</td>
                  <td>
                    <button type="button" className="btn btn-secondary">
                      ปริ้นใบเช็คชื่อ
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ModalCourse val={courseValue} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(SASuccess);
