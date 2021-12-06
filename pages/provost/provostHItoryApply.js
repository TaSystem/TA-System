import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import Link from "next/link";
import ModalCourse from "../../components/ModalCourse";
import ModalDetailTeacher from "../../components/ModalDetailTeacher";
import ModalHistoryReply from "../../components/ModalHistoryReply";

function provostHItoryApply(props) {
  const [session, loading] = useSession();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState(null);
  const [yearSearch, setYearSearch] = useState([]);
  const [year, setYear] = useState(null);
  const [term, setTerm] = useState(null);
  const [major, setMajor] = useState(null);
  const [courseValue, setCourseValue] = useState([]);
  const [teacherValue, setTeacherValue] = useState([]);
  const [historyReply, setHistoryReply] = useState([]);
  const [applyID, setApplyID] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
      async function getCourses() {
        const response = await Axios.get(
          `/courses/teacher-apply/${session.user.email}`
        );
        setCourses(response.data);
      }
      async function getYear() {
        const response = await Axios.get("/courses/year");
        setYearSearch(response.data);
      }
      getYear();
      getCourses();
    }
  }, [loading]);

  const condition = (status) => {
    if (status === 1) {
      return (
        <td>
          <p
            style={{
              backgroundColor: "#E3E726",
              color: "white",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            รอดำเนินการจากเจ้าหน้าที
          </p>{" "}
        </td>
      );
    } else if (status === 2) {
      return (
        <td>
          <p
            style={{
              backgroundColor: "#E3E726",
              color: "white",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            รอดำเนินการจากหัวหน้าภาค
          </p>{" "}
        </td>
      );
    } else if (status === 3) {
      return (
        <td>
          <p
            style={{
              backgroundColor: "#E3E726",
              color: "white",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            รอดำเนินการจากรองคณบดี
          </p>{" "}
        </td>
      );
    } else if (status === 4) {
      return (
        <td>
          <p
            style={{
              backgroundColor: "#E3E726",
              color: "white",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            รอดำเนินทำเอกสารการจากเจ้าหน้าที
          </p>{" "}
        </td>
      );
    } else if (status === 5) {
      return (
        <td>
          <p
            style={{
              backgroundColor: "#0E7ADD",
              color: "white",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            ขอTAสำเร็จ
          </p>{" "}
        </td>
      );
    } else {
      return (
        <td>
          <p
            style={{
              backgroundColor: "#DD0E0E",
              color: "white",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            ขอTAไม่ผ่าน
          </p>{" "}
        </td>
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
  const TeacherapplyID = (id) => {
    let l = id.toString().length;
    if (l == 1) return "TR00000" + id;
    else if (l == 2) return "TR0000" + id;
    else if (l == 3) return "TR000" + id;
    else if (l == 4) return "TR00" + id;
    else if (l == 5) return "TR0" + id;
    else if (l == 6) return "TR" + id;
  };
  const showModalHistory = async (id) => {
    const response = await Axios.get(`/historyreply/${id}`);
    setHistoryReply(response.data);
    setApplyID(id);
  };
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
              TeacherapplyID(course.AID)
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
            TeacherapplyID(course.AID)
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
              TeacherapplyID(course.AID)
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
              TeacherapplyID(course.AID)
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
  const del = async (id) => {
    setError(null);
    setSuccess(null);
    await Axios.delete(`/reply/delete/teacher-request/${id}`)
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

  return (
    <div className="container">
      <h1>
        {props.nisit.roleID == 1
          ? "ประวัติยื่นคำร้องอาจารย์"
          : "ประวัติยื่นคำร้อง"}
      </h1>
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
        จำนวนคำร้องทั้งหมด:{" "}
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
            cellspacing="0"
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
                <th>ลำดับ</th>
                <th>รหัสคำร้อง</th>
                <th>รหัสวิชา</th>
                <th>ชื่อวิชา</th>
                <th>สาขาวิชา</th>
                <th>เหตุผลที่ขอ</th>
                <th>เหตุผลที่ยกเลิก</th>
                <th>ปีการศึกษา</th>
                <th>เทอมการศึกษา</th>
                {props.nisit.roleID == 1 && <th>อาจารย์ผู้ขอ</th>}
                <th>จำนวนนิสิตที่ขอ</th>
                <th>สถานะ</th>
                {props.nisit.roleID == 1 && <th>ลบ</th>}
              </tr>
            </thead>
            <tbody>
              {Filter(courses).map((val, key) => {
                return (
                  <tr>
                    <td> {key + 1}</td>
                    {props.nisit.roleID == 1 ? (
                      <td>
                        <Link href="#">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#ModalHistoryReply"
                            onClick={() => showModalHistory(val.AID)}
                          >
                            {TeacherapplyID(val.AID)}
                          </a>
                        </Link>
                      </td>
                    ) : (
                      <td>{TeacherapplyID(val.AID)}</td>
                    )}
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
                    {props.nisit.roleID == 1 && (
                      <td>
                        <Link href="#">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#ModalDetailTeacher"
                            onClick={() => showModalTeacher(val)}
                          >
                            {val.name} {val.lastname}
                          </a>
                        </Link>
                      </td>
                    )}

                    <td>{val.number1 + val.number2}</td>
                    <td>{condition(val.status)}</td>
                    {props.nisit.roleID == 1 && (
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
                    )}
                  </tr>
                );
              })}
              {courses && !courses.length && (
                <h2 style={{ color: "red" }}>ยังไม่เคยยื่นขอ</h2>
              )}
            </tbody>
          </table>
          <ModalDetailTeacher val={teacherValue} />
          <ModalCourse val={courseValue} />
          <ModalHistoryReply AID={applyID} history={historyReply} />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(provostHItoryApply);
