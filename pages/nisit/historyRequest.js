import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import {
  getDetailNisit,
  getCoursesNisit,
} from "../../redux/actions/nisitAction";
import { useRouter } from "next/router";

function historyReqest(props) {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState(null);
  const [yearSearch, setYearSearch] = useState([]);
  const [year, setYear] = useState(null);
  const [term, setTerm] = useState(null);
  const [major, setMajor] = useState(null);
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // console.log("useEffect 1");
      async function getCourses() {
        const response = await Axios.post("/courses/student-apply", {
          email: session.user.email,
        });
        setCourses(response.data);
        session ? props.getCoursesNisit(session.user.email) : null;
      }
      async function getYear() {
        const response = await Axios.get("/courses/year");
        setYearSearch(response.data);
      }
      getYear();
      getCourses();
    }
  }, [loading]);

  useEffect(() => {
    // console.log("useEffect 2");
    if (session && props.nisit.length == 0) {
      // console.log("useEffect get getDetailNisit");
      props.getDetailNisit(session.user.email);
    }
    if (session) {
      // console.log("useEffect get getCoursesNisit");
      props.getCoursesNisit(session.user.email);
    }
  }, [loading]);

  const condition = (status) => {
    if (status === 1) {
      return (
        <>
          <p class="text-nowrap" style={{ backgroundColor: "#E3E726", color: "white",borderRadius:"6px",padding:"3px" }}>
          
            รอดำเนินการจากอาจารย์
          </p>
        </>
      );
    } else if (status === 2) {
      return (
        <>
          <p class="text-nowrap" style={{ backgroundColor: "#E3E726", color: "white",borderRadius:"6px",padding:"3px" }}>

            รอดำเนินการจากเจ้าหน้าที่
          </p>
        </>
      );
    } else if (status === 3) {
      return (
        <>
          <p class="text-nowrap" style={{ backgroundColor: "#32CD32", color: "white",borderRadius:"6px",padding:"3px" }}>
            ขอTAสำเร็จ
          </p>
        </>
      );
    } else {
      return (
        <>
          <p class="text-nowrap" style={{ backgroundColor: "#DD0E0E", color: "white",borderRadius:"6px",padding:"3px" }}>
          
            ขอTAไม่ผ่าน
          </p>{" "}
        </>
      );
    }
  };

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    // console.log("in that case");
    return (
      <div>
        <h2>You aren't signed in, please sign in first</h2>
      </div>
    );
  }

  function Filter(courses) {
    return courses.filter((course) => {
      if (year == null) {
        if (term == null) {
          if (major == null) {
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
            } else if (
              course.teacher.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            }
          }
        }
      } else if (year == course.year) {
        if (term == null) {
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
          } else if (
            course.teacher.toLowerCase().includes(search.toLowerCase())
          ) {
            return course;
          }
        } else if (term == course.term) {
          if (major == course.major) {
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
            } else if (
              course.teacher.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            }
          } else if (major == null) {
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
            } else if (
              course.teacher.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            }
          }
        }
      }
    });
  }
  // console.log("props in history  >> ", props);
  // console.log("session in history ", session);
  // console.log("router in history ", router.pathname);
  // console.log("props Courses in history ", props.courses);
  // console.log("Courses in history ", courses);

  return (
    <div className="container">
      <h1>รายวิชาที่ยื่นขอ {props.nisit.email}</h1>
      <div className="information">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ชื่อวิชา/รหัสวิชา/อาจารย์"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          name="year"
          onChange = { (e) => {
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
            {year ? "ภาคเรียน" : "เลือกปีการศึกษาก่อน"}
          </option>
          
          {year&&<option value="ต้น">ต้น</option>}
          {year&&<option value="ปลาย">ปลาย</option>}
        </select>

        <select
          name="major"
          onChange={(e) => {
            setMajor(e.target.value);
          }}
        >
          <option value="All" disabled selected hidden>
            {term ? "สาขาของวิชา" : "เลือกภาคเรียนก่อน"}
          </option>

          {term&&<option value="วิศวกรรมอุตสาหการและระบบ">
            วิศวกรรมอุตสาหการและระบบ(ป.ตรี)
          </option>}

          {term&&<option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์">
            วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.ตรี)
          </option>}

          {term&&<option value="วิศวกรรมโยธา">วิศวกรรมโยธา(ป.ตรี)</option>}

          {term&&<option value="วิศวกรรมเครื่องกลและการออกแบบ">
            วิศวกรรมเครื่องกลและการออกแบบ(ป.ตรี)
          </option>}
          {term&&<option value="วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์">
            วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์(ป.ตรี)
          </option>}
          {term&&<option value="วิศวกรรมเครื่องกลและระบบการผลิต">
            วิศวกรรมเครื่องกลและระบบการผลิต(ป.ตรี)
        </option>}
        {term&&<option value="วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ">
            วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ(ป.ตรี)
        </option>}
        </select>
      </div>
      จำนวนคำร้อง:{courses != null && courses.length != 0 ? courses.length : 0} 
      <div className="table-responsive" style={{maxHeight:"70vh",maxWidth:"80vw",marginTop:"1vh"}}>
        <table className="table table-hover table-bordered" cellspacing="0" style={{textAlign:"center"}}>
          <thead style={{position:"sticky",top:0,background:"#7a0117",color:"#fff",fontWeight:"400"}}>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th colSpan="2">เวลาเรียน</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">ปีการศึกษา</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อาจารย์</th>
              <th rowSpan="2">สถานะ</th>
            </tr>
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
            </tr>
          </thead>
          <tbody>
            {Filter(courses).map((val, key) => {
              return (
                <tr>
                  <td>{key + 1}</td>
                  <td>{val.courseID}</td>
                  <td>{val.title}</td>
                  <td>{val.sec_D ? val.sec_D : "-"} </td>
                  <td>{val.sec_P ? val.sec_P : "-"}</td>
                  <td>
                    {val.day_D ? val.day_D : ""}{" "}
                    {val.start_D ? val.start_D + " - " + val.end_D : ""}
                  </td>

                  <td>
                    {val.day_P ? val.day_P : ""}{" "}
                    {val.start_P ? val.start_P + " - " + val.end_P : ""}
                  </td>
                  
                  <td>{val.major}</td>
                  <td>{val.year}</td>
                  <td>{val.term}</td>
                  <td>{val.teacher}</td>
                  <td>{condition(val.status)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
  courses: state.nisit.courses,
});

const mapDispatchToProps = {
  // setRegisterNisit: setRegisterNisit,
  getDetailNisit: getDetailNisit,
  getCoursesNisit: getCoursesNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(historyReqest);
