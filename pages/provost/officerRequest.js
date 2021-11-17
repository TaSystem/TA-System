import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import SelectMajor from "../../components/SelectMajor";
import Link from "next/link";
import ModalDetailTeacher from "../../components/ModalDetailTeacher";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";

function OfficerRequest(props) {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [success, setSuccess] = useState(null);
  const [major, setMajor] = useState("All");
  const [session, loading] = useSession();
  const [teacherValue,setTeacherValue] = useState([]);
  
  useEffect(() => {
    async function getCourses() {
      const response = await Axios.get(`/courses/teacher-reply/${1}`);
      setCourseList(response.data);
    }
    getCourses();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

  const TeacherapplyID = (id) =>{
    let l = id.toString().length;
    if(l==1) return "TR00000"+id;
    else if(l==2) return "TR0000"+id;
    else if(l==3) return "TR000"+id;
    else if(l==4) return "TR00"+id;
    else if(l==5) return "TR0"+id;
    else if(l==6) return "TR"+id;
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

  async function replyTAsuccess(course,AID) {
    await Axios.put("/reply/teacher-reply", {
      email:session.user.email,
      applyTaId:AID,
      courseID: course,
      status: 2,
      notereply:null
    }).then((res) => {
      setCourseList(
        courseList.filter((val) => {
          return val.AID !== AID;
        })
      );
      setSuccess(res.data.message);
    });
  }

  async function replyTAfail(course,AID,title) {
    let notereply = prompt("เหตุผลที่ยกเลิกวิชา "+title);
    if(notereply != null){
      await Axios.put("/reply/teacher-reply", {
        email:session.user.email,
        applyTaId:AID,
        courseID: course,
        status: 0,
        notereply:notereply
      }).then((res) => {
        setCourseList(
          courseList.filter((val) => {
            return val.AID !== AID;
          })
        );
        setSuccess(res.data.message);
      });
    }
    else{
      console.log("cancle")
    }
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

  //จำนวนที่ลงใส่หน้านี้

  return (
    <div className="container">
      <h1>รายวิชาที่ยื่นขอเปิดรับ SA (เจ้าหน้าที่)</h1>
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
              <th rowSpan="2">รหัสคำขอ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">จำนวนที่รับ</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th rowSpan="2">อาจารย์ผู้ขอ</th>
              <th colSpan="2">จำนวนที่ขอ</th>
              <th rowSpan="2">จำนวนชั่วโมง/สัปดาห์</th>
              <th rowSpan="2">ค่าใช้จ่าย</th>
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
                  <td>{key + 1}</td>
                  <td>{TeacherapplyID(val.AID)}</td>
                  <td>{val.courseID}</td>
                  <td>{val.title}</td>
                  <td>{val.sec_D ? val.sec_D : "-"}</td>
                  <td>{val.sec_P ? val.sec_P : "-"}</td>
                  <td>{val.major}</td>
                  <td>{val.number_D ? val.number_D : val.number_P}</td>
                  
                  <td>{val.teacher}</td>
                  <td>
                    <Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalDetailTeacher"  onClick={()=>showModalTeacher(val)}>
                        {val.name} {val.lastname}
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
                  <td>{val.noteapply}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        if (window.confirm("ต้องการยืนยันวิชา: " + val.title))
                          replyTAsuccess(val.CID,val.AID);
                      }}
                    >
                      ยืนยัน
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      // data-bs-toggle="modal" 
                      // data-bs-target="#exampleModal"
                      // onClick={()=>window.prompt("เหตุผลในการยกเลิกรายวิชา "+val.title)}
                      // onClick={()=>showModal(val)}
                      onClick={() =>  replyTAfail(val.CID,val.AID,val.title)}
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ModalDetailTeacher val={teacherValue}  />

        
      
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

export default connect(mapStateToProps, mapDispatchToProps)(OfficerRequest);

