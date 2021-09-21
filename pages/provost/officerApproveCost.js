import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import SelectMajor from "../../components/SelectMajor";
import Link from "next/link";
import ModalCourse from "../../components/ModalCourse";
import ModalDetailTeacher from "../../components/ModalDetailTeacher";
import ModalHistoryReply from "../../components/ModalHistoryReply";


function officerApproveCost(props) {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [success, setSuccess] = useState(null);
  const [major, setMajor] = useState("All");
  const [numberReal, setNumberReal] = useState({});
  const [value,setValue] = useState([]);
  const [applyID,setApplyID] = useState([]);
  const [historyReply,setHistoryReply] = useState([]);
  const [session, loading] = useSession();

  
  useEffect(() => {
    async function getCourses() {
      const response = await Axios.post("/courses/teacher-reply", {
        status: 4,
      });
      setCourseList(response.data);
    }
    getCourses();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

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

  const TeacherapplyID = (id) =>{
    let l = id.toString().length;
    if(l==1) return "TR00000"+id;
    else if(l==2) return "TR0000"+id;
    else if(l==3) return "TR000"+id;
    else if(l==4) return "TR00"+id;
    else if(l==5) return "TR0"+id;
    else if(l==6) return "TR"+id;
}


  async function CheckCourseCondition(course,AID) {
    await Axios.put("/reply/check-course-condition", {
      email:session.user.email,
      applyTaId:AID,
      status: 5,
    }).then((response) => {
      setSuccess(response.data.message);
      setCourseList(response.data.data);
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

  const updateNumberReal = async (id) => {
    await Axios.put("/courses/updateNumber", {
      id: id,
      numberReal: numberReal,
    }).then((response) => {
      setCourseList(response.data);
    });
  };

  const showModalHistory = async (id) =>{
    const response = await Axios.get(`/historyreply/${id}`);
    setHistoryReply(response.data);
    setApplyID(id);
  }
  
  //จำนวนที่ลงใส่หน้านี้

  return (
    <div className="container">
      <h1>พิมพ์เอกสารอนุมัติค่าใช้จ่าย (เจ้าหน้าที่)</h1>
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
        <button type="submit" className="btn btn-success">
          พิมพ์เอกสารอนุมัติค่าใช้จ่าย
        </button>
        <p style={{color:"red"}} > *ต้องปริ้นเอกสารอนุมัติหลักการก่อนจะตรวจสอบ </p>
        {/* <button type="submit" className="btn btn-success">
          ตรวจสอบทั้งหมด
        </button> */}
      <div className="information">
      {success && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success}{" "}
            </div>
      )}
        จำนวนคำร้อง: {courseList != null && courseList.length != 0 ? courseList.length : "loading..."}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสคำขอ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">จำนวนที่รับ</th>
              <th rowSpan="2">จำนวนที่ลง</th>
              <th rowSpan="2">กรอกจำนวนที่ลง</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th rowSpan="2">อาจารย์ผู้ขอ</th>
              <th colSpan="2">จำนวนที่ขอ</th>
              <th rowSpan="2">จำนวนชั่วโมง/สัปดาห์</th>
              <th rowSpan="2">ค่าใช้จ่าย</th>
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
                  <td>{key + 1}</td>
                  <td>
                    <Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalHistoryReply" onClick={()=>showModalHistory(val.AID)} >
                        {TeacherapplyID(val.AID)}
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalCourse"  onClick={()=>setValue(val)}>
                        {val.courseID}
                      </a>
                    </Link>
                  </td>
                  <td>{val.title}</td>
                  <td>{val.sec_D ? val.sec_D : "-"}</td>
                  <td>{val.sec_P ? val.sec_P : "-"}</td>
                  <td>{val.major}</td>
                  <td>{val.number_D ? val.number_D : val.number_P}</td>
                  <td>{val.numberReal ? val.numberReal : "ยังไม่กรอก"}</td>
                  <td>
                    <input
                      key={key}
                      className="form-control"
                      type="text"
                      placeholder="จำนวนนิสิต"
                      
                    />
                    <button
                    key={key}
                      type="button"
                      className="btn btn-success"
                      onClick={() => updateNumberReal(val.CID)}
                    >
                      ยืนยัน
                    </button>
                  </td>
                  <td>{val.teacher}</td>
                  <td>
                    <Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalDetailTeacher"  onClick={()=>setValue(val)}>
                        {val.name_email}
                      </a>
                    </Link>
                  </td>
                  <td>{val.number1}</td>
                  <td>{val.number2}</td>
                  {val.sec_D && val.sec_P && <td>5</td>}
                  {val.sec_D && !val.sec_P && <td>2</td>}
                  {!val.sec_D && val.sec_P && <td>3</td>}
                  {val.sec_D && val.sec_P && (
                    <td>
                      {val.number1 * 5 * 30 * 15 + val.number2 * 5 * 40 * 15}
                    </td>
                  )}
                  {val.sec_D && !val.sec_P && (
                    <td>
                      {val.number1 * 2 * 30 * 15 + val.number2 * 2 * 40 * 15}
                    </td>
                  )}
                  {!val.sec_D && val.sec_P && (
                    <td>
                      {val.number1 * 3 * 30 * 15 + val.number2 * 3 * 40 * 15}
                    </td>
                  )}
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        if (window.confirm("ต้องการยืนยันวิชา: " + val.title))
                          CheckCourseCondition(val.CID,val.AID);
                      }}
                    >
                      ตรวจสอบ
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        if (window.confirm("ต้องการยืนยันวิชา: " + val.title))
                          replyTAfail(val.CID,val.AID);
                      }}
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ModalCourse val={value} />
        <ModalDetailTeacher val={value} />
        <ModalHistoryReply AID={applyID} history={historyReply}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(officerApproveCost);


