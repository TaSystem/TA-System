import Axios from "../../../config/Axios";
import React, { useState, useEffect } from "react";
import Modal from "../../../components/ModalTeacher";
import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../../redux/actions/nisitAction";

function coursesTeacher(props) {
  //ขอเลือกระดับได้
  const [courseList, setCourseList] = useState([]);
  const [system, setSystem] = useState([]);
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState(null);
  const [yearNow, setYearNow] = useState([]);
  const [load, setLoad] = useState(false);
  const [session, loading] = useSession(); //ชื่อมันซ้ำ
  var syStatus =
    system != null && system.length != 0 ? system[0].status : "loading...";
  
  useEffect(() => {
    async function getCourses() {
      setLoad(true);
      const response = await Axios.get("/courses/course-open");
      setCourseList(response.data);
      setLoad(false);
    }
    async function getSystem() {
      const response = await Axios.get("/system/1");
      setSystem(response.data);
    }
    async function getYear() {
      const response = await Axios.get("/setdate/getNow");
      setYearNow(response.data);
    }
    getYear();
    getSystem();
    getCourses();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
    }
  }, [loading]);

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
      else if (course.major.toLowerCase().includes(search.toLowerCase())) {
        return course;
      }
      
    });
  }

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    // console.log("in that case");
    return (
      <div>
        <h2>You aren't signed in, please sign in first</h2>
      </div>
    );
  } else if (!syStatus) {
    return (
      <div>
        <h2>ระบบรับสมัครวิชาเปิดรับนิสิตช่วยงานถูกปิด</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>รายวิชาที่เปิดสอน </h1>
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
      {/* <h2>ระบบ {syStatus ? "เปิด" : "ปิด"}{" "}</h2> */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
        onChange={(e) => setSearch(e.target.value)}
      />
      จำนวน:{" "}
      {courseList != null && courseList.length != 0 ? courseList.length : 0}{" "}
      วิชา
      <div className="table-responsive" style={{maxHeight:"65vh",marginTop:"1vh"}}>
        
          <table className="table table-hover table-borderless" cellspacing="0" style={{textAlign:"center"}}>
            <thead style={{position:"sticky",top:0,background:"#7a0117",color:"#fff",fontWeight:"400"}}>
              <tr>
                <th rowSpan="2">ลำดับ</th>
                <th rowSpan="2">รหัสวิชา</th>
                <th rowSpan="2">ชื่อวิชา</th>
                <th colSpan="2">หมู่เรียน</th>
                <th rowSpan="2">ระดับ</th>
                <th rowSpan="2">สาขาวิชา</th>
                <th rowSpan="2">อาจารย์ผู้สอน</th>
                <th colSpan="2" class="text-nowrap">จำนวนนิสิต</th>
                <th rowSpan="2">ข้อมูล/ลงทะเบียน</th>
                <th rowSpan="2">สถานะ</th>
              </tr>

              <tr>
                <th>บรรยาย</th>
                <th>ปฎิบัติ</th>
                <th>รับ</th>
                <th>ลง</th>
              </tr>
            </thead>
            <tbody>
              {Filter(courseList).map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{val.courseID}</td>
                      <td>{val.title}</td>
                      <td>{val.sec_D ? val.sec_D : "-"}</td>
                      <td>{val.sec_P ? val.sec_P : "-"}</td>
                      <td class="text-nowrap">{val.level}</td>
                      <td>{val.major}</td>
                      <td>{val.teacher}</td>
                      <td>{val.number_D ? val.number_D : val.number_P}</td>
                      <td>{val.numberReal ? val.numberReal : 0}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary text-nowrap"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => setValue(val)}
                        >
                          ข้อมูล/ลงทะเบียน
                        </button>
                      </td>
                      {val.status ? (
                        <td>
                          {" "}
                          <p
                            class="text-nowrap"
                            style={{ color: "green",borderRadius:"6px",padding:"5px" }}
                          >
                            ขอSAได้
                          </p>{" "}
                        </td>
                      ) : (
                        <td>
                          {" "}
                          <p class="text-nowrap" style={{ color: "red",borderRadius:"6px",padding:"5px"}}>
                            ขอSAไม่ได้
                          </p>{" "}
                        </td>
                      )}
                    </tr>
                  );
                })}
                {load  && <h2 style={{color:"red"}}>กำลังโหลด...</h2>}
                {!load && courseList && !courseList.length && <h2 style={{color:"red"}}>ไม่มีรายวิชาที่เปิดสอน</h2>}
                
            </tbody>
          </table>
         
        <Modal val={value} />
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

export default connect(mapStateToProps, mapDispatchToProps)(coursesTeacher);
