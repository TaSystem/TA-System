import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import SelectMajor from "../../components/SelectMajor";
import ModalCourse from "../../components/ModalCourse";
import ModalDetailTeacher from "../../components/ModalDetailTeacher";
import ModalHistoryReply from "../../components/ModalHistoryReply";
import ModalCourseNisitSA from "../../components/ModalCourseNisitSA";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";

function officerCourseSuccess(props) {
  const [courseList, setCourseList] = useState([]);
  const [users,setUsers] = useState([]);
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState(null);
  const [major, setMajor] = useState("All");
  const [applyID,setApplyID] = useState([]);
  const [historyReply,setHistoryReply] = useState([]);
  const [courseValue,setCourseValue] = useState([]);
  const [teacherValue,setTeacherValue] = useState([]);
  const [session, loading] = useSession();
  
  useEffect(() => {
    async function getCourses() {
      const response = await Axios.get(`/courses/teacher-reply/${5}`);
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

  const showModalHistory = async (id) =>{
    const response = await Axios.get(`/historyreply/${id}`);
    setHistoryReply(response.data);
    setApplyID(id);
  }

  const showModalCourse =  (val) =>{
    setCourseValue({
      CID:val.CID,
      title:val.title,
      courseID:val.courseID,
      sec_D:val.sec_D,
      sec_P:val.sec_P,
      day_D:val.day_D,
      day_P:val.day_P,
      start_D:val.start_D,
      start_P:val.start_P,
      end_D:val.end_D,
      end_P:val.end_P,
      number_D:val.number_D,
      number_D:val.number_P,
      level:val.level,
      major:val.major,
      teacher:val.teacher
      
    });
  }

  const showModalTeacher =  (val) =>{
    setTeacherValue({
      CID:val.CID,
      email:val.email,
      name_email:val.name_email,
      name:val.name,
      lastname:val.lastname,
      department:val.department,
      roleTitle:val.roleTitle,
      tel:val.tel,
    });
    
  }

  
  const showModalCourseNisitSA = async (val) => {
    const response = await Axios.get(`/users/users-SA/${val.CID}`);
    setUsers(response.data);
    setCourse({
      title:val.title,
      courseID:val.courseID,
      sec_D:val.sec_D,
      sec_P:val.sec_P
    })
  };
  

  //จำนวนที่ลงใส่หน้านี้

  return (
    <div className="container">
      <h1>รายวิชาที่เปิดรับ SA ได้(เจ้าหน้าที่)</h1>
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

      รายวิชาทั้งหมด: {courseList != null && courseList.length != 0 ? courseList.length : 0} วิชา
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
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th rowSpan="2">อาจารย์เจ้าของวิชา</th>
              <th colSpan="2">นิสิตSA</th>
              
            </tr>
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
              <th>จำนวนที่รับ</th>
              <th>ดูข้อมูล</th>
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
                      <a  data-bs-toggle="modal" data-bs-target="#ModalCourse"  onClick={()=>showModalCourse(val)}>
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
                  
                  <td>{val.teacher}</td>
                  <td>
                    <Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalDetailTeacher"  onClick={()=>showModalTeacher(val)}>
                        {val.name} {val.lastname}
                      </a>
                    </Link>
                    
                  </td>
                  
                  <td>
                    {/* <Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalCourseNisitSA"  onClick={() => showModalCourseNisitSA(val)}> */}
                        {val.numberTAReal}
                      {/* </a>
                    </Link> */}
                    
                  </td>
                  <td>
                    <button type="button" className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#ModalCourseNisitSA"  onClick={() => showModalCourseNisitSA(val)} >
                      ดูข้อมูล
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ModalCourse val={courseValue} />
        <ModalDetailTeacher val={teacherValue}  />
        <ModalHistoryReply AID={applyID} history={historyReply}  />
        <ModalCourseNisitSA users={users} course={course} />

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

export default connect(mapStateToProps, mapDispatchToProps)(officerCourseSuccess);

