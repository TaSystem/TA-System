import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import {
  getDetailNisit,
  getCoursesNisit,
} from "../../redux/actions/nisitAction";
import { useRouter } from "next/router";
import ModalCourse from "../../components/ModalCourse";
import ModalHistoryReplyNisit from "../../components/ModalHistoryReplyNisit";
import ModalDetailNisit from "../../components/ModalDetailNisit";
import Link from "next/link";

function HistoryReqest(props) {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState(null);
  const [yearSearch, setYearSearch] = useState([]);
  const [year, setYear] = useState(null);
  const [term, setTerm] = useState(null);
  const [major, setMajor] = useState(null);
  const [session, loading] = useSession();
  const [courseValue, setCourseValue] = useState([]);
  const [applyID, setApplyID] = useState([]);
  const [historyReply, setHistoryReply] = useState([]);
  const [nisitValue, setNisitValue] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // console.log("useEffect 1");
      async function getCourses() {
        const response = await Axios.get("/courses/student-history");
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
  }, [loading, props, session]);

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
  }, [loading, props, session]);

  const condition = (status) => {
    if (status === 1) {
      return (
        <>
          <p
            className="text-nowrap"
            style={{
              backgroundColor: "#E3E726",
              color: "white",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            รอดำเนินการจากอาจารย์
          </p>
        </>
      );
    } else if (status === 2) {
      return (
        <>
          <p
            className="text-nowrap"
            style={{
              backgroundColor: "#E3E726",
              color: "white",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            รอดำเนินการจากเจ้าหน้าที่
          </p>
        </>
      );
    } else if (status === 3) {
      return (
        <>
          <p
            className="text-nowrap"
            style={{
              backgroundColor: "#32CD32",
              color: "white",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            ขอTAสำเร็จ
          </p>
        </>
      );
    } else {
      return (
        <>
          <p
            className="text-nowrap"
            style={{
              backgroundColor: "#DD0E0E",
              color: "white",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            ขอTAไม่ผ่าน
          </p>{" "}
        </>
      );
    }
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
  const NisitapplyID = (id) => {
    let l = id.toString().length;
    if (l == 1) return "SR00000" + id;
    else if (l == 2) return "SR0000" + id;
    else if (l == 3) return "SR000" + id;
    else if (l == 4) return "SR00" + id;
    else if (l == 5) return "SR0" + id;
    else if (l == 6) return "SR" + id;
  };
  const showModalNisit = (val) => {
    setNisitValue({
      CID: val.CID,
      email: val.email,
      name_email: val.name_email,
      name: val.name,
      lastname: val.lastname,
      idStudent: val.idStudent,
      lvl: val.lvl,
      department: val.department,
      roleTitle: val.roleTitle,
      tel: val.tel,
      nameBank: val.nameBank,
      idBank: val.idBank,
      fileCardStudent: val.fileCardStudent,
      fileBookBank: val.fileBookBank,
    });
  };
  const del = async (id) => {
    setError(null);
    setSuccess(null);
    await Axios.delete(`/reply/delete/student-request/${id}`)
      .then((response) => {
        setSuccess(response.data);
        setCourses(
          courses.filter((val) => {
            return val.AID !== id;
          })
        );
      })
      .catch(() => {
        setError("ลบไฟล์ไม่สำเร็จ!!");
      });
  };

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    // console.log("in that case");
    return (
      <div>
        <h2>You aren&apos;t signed in, please sign in first</h2>
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
            } else if (
              NisitapplyID(course.AID)
                .toLowerCase()
                .includes(search.toLowerCase())
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
          } else if (
            NisitapplyID(course.AID)
              .toLowerCase()
              .includes(search.toLowerCase())
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
            } else if (
              NisitapplyID(course.AID)
                .toLowerCase()
                .includes(search.toLowerCase())
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
            } else if (
              NisitapplyID(course.AID)
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return course;
            }
          }
        }
      }
    });
  }

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

  const showModalHistory = async (id) => {
    const response = await Axios.get(`/historyreply/nisit/${id}`);
    setHistoryReply(response.data);
    setApplyID(id);
  };

  return (
    <div className="container">
      <h1>ประวัติยื่นคำร้องนิสิต</h1>
      <div className="information">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="รหัสคำร้อง/ชื่อวิชา/รหัสวิชา/อาจารย์"
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
              return <option value={val.year} key={key}>{val.year}</option>;
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

            {year && <option value="ต้น">ต้น</option>}
            {year && <option value="ปลาย">ปลาย</option>}
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

            {term && (
              <option value="วิศวกรรมอุตสาหการและระบบ">
                วิศวกรรมอุตสาหการและระบบ(ป.ตรี)
              </option>
            )}

            {term && (
              <option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์">
                วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.ตรี)
              </option>
            )}

            {term && <option value="วิศวกรรมโยธา">วิศวกรรมโยธา(ป.ตรี)</option>}

            {term && (
              <option value="วิศวกรรมเครื่องกลและการออกแบบ">
                วิศวกรรมเครื่องกลและการออกแบบ(ป.ตรี)
              </option>
            )}
            {term && (
              <option value="วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์">
                วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์(ป.ตรี)
              </option>
            )}
            {term && (
              <option value="วิศวกรรมเครื่องกลและระบบการผลิต">
                วิศวกรรมเครื่องกลและระบบการผลิต(ป.ตรี)
              </option>
            )}
            {term && (
              <option value="วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ">
                วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ(ป.ตรี)
              </option>
            )}
          </select>
        </div>
        จำนวนคำร้อง:
        {courses != null && courses.length != 0 ? Filter(courses).length : 0}
        {success && (
          <div className="alert alert-success" role="alert">
            {" "}
            {success}{" "}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {" "}
            {error}{" "}
          </div>
        )}
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
                <th rowSpan="2">รหัสคำร้อง</th>
                <th rowSpan="2">รหัสวิชา</th>
                <th rowSpan="2">ชื่อวิชา</th>

                <th rowSpan="2">สาขาวิชา</th>
                <th rowSpan="2">เหตุผลที่ขอ</th>
                <th rowSpan="2">เหตุผลที่ยกเลิก</th>
                <th rowSpan="2">ปีการศึกษา</th>
                <th rowSpan="2">เทอมการศึกษา</th>
                <th rowSpan="2">นิสิตที่ยื่นขอ</th>
                <th rowSpan="2">สถานะ</th>
                <th rowSpan="2">ลบ</th>
              </tr>
            </thead>
            <tbody>
              {Filter(courses).map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>
                      <Link href="#">
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#ModalHistoryReply"
                          onClick={() => showModalHistory(val.AID)}
                        >
                          {NisitapplyID(val.AID)}
                        </a>
                      </Link>
                    </td>
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
                    <td>{val.major}</td>
                    <td>{val.noteapply}</td>
                    <td>{val.notereply}</td>
                    <td>{val.year}</td>
                    <td>{val.term}</td>

                    <td>
                      <Link href="#">
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#ModalDetailNisit"
                          onClick={() => showModalNisit(val)}
                        >
                          {val.name} {val.lastname}
                        </a>
                      </Link>
                    </td>
                    <td>{condition(val.status)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          if (window.confirm("ยืนยันการลบบุคลากร"))
                            del(val.AID);
                        }}
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ModalCourse val={courseValue} />
          <ModalDetailNisit val={nisitValue} role={props.nisit.roleID} />
          <ModalHistoryReplyNisit AID={applyID} history={historyReply} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryReqest);
