import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import { useRouter } from "next/router";
import Navbar from '../../components/Navbar'

function index(props) {
  const [courses, setCourses] = useState([]);
  const [session, loading] = useSession();
  const [search, setSearch] = useState(null);
  const [success, setSuccess] = useState(null);
  const [yearSearch, setYearSearch] = useState([]);
  const [year, setYear] = useState(null);
  const [term, setTerm] = useState(null);
  const [major, setMajor] = useState(null);
  const router = useRouter();

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

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

  const deleteCourse = async (id) =>{
    await Axios.delete(`/courses/delete/${id}`).then((response) => {
      setCourses(response.data.data);
      setSuccess(response.data.message);
    });
  }
  const deleteCourseList = async () =>{
    await Axios.post("/courses/delete",{
      year:year,
      term:term,
      major:major
    }).then((response) => {
      setCourses(response.data.data);
      setSuccess(response.data.message);
    });
  }
  const addCourses = () => {
    return router.push(`/provost/coursesImport`);
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

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    console.log("in that case");
    return (
      <div>
        <h2>You aren't signed in, please sign in first</h2>
      </div>
    );
  }

  console.log("props in provost ",props.nisit)

  return (
    <div className="container">
      {/* <Navbar roleID={props.nisit.roleID} /> */}
      <h1>เจ้าหน้าที่</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ชื่อวิชา/รหัสวิชา/อาจารย์"
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
        {term&&<option value="วิศวกรรมเครื่องกลและระบบการผลิต">
            วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ(ป.ตรี)
        </option>}
        </select>
      </div>
      <div>
      <button type="submit" className="btn btn-success" onClick={()=>addCourses()}>
          เพิ่มรายวิชา
        </button>
        <button type="submit" className="btn btn-danger" onClick={()=>{if (window.confirm('ลบวิชาที่ ปีการศึกษา '+year+" ภาคเรียน "+term+" สาขา "+major))deleteCourseList()}}>
          ลบวิชารายวิชา
        </button>
      </div>
      <div className="information">
      {success && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success}{" "}
            </div>
      )}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">พศ.ที่ปรับปรุงหลักสูตร</th>
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
                  <td>
                    {key + 1}
                    <button type="button" className="btn btn-danger" onClick={()=>{if (window.confirm('ต้องการลบวิชา: '+val.title))deleteCourse(val.id)}}>
                      ลบ
                    </button>
                  </td>
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

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
