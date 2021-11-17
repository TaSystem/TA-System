import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import SelectMajor from "../../components/SelectMajor";
import Link from "next/link";
import ModalDetailTeacher from "../../components/ModalDetailTeacher";

function HeadRequest(props) {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [major, setMajor] = useState("All");
  const [level, setLevel] = useState("All");
  const [session, loading] = useSession();
  const [teacherValue,setTeacherValue] = useState([]);
  const [success, setSuccess] = useState(null);
  
  useEffect(() => {
    async function getCourses() {
      const response = await Axios.post(`/courses/teacher-reply/`,{
        email:props.nisit.email,
        status:2,
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


  async function replyTAsuccess(course,AID) {
    await Axios.put("/reply/teacher-reply", {
      email:session.user.email,
      applyTaId:AID,
      courseID: course,
      status: 3,
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
console.log("roleID: ",props.nisit.roleID);

const searchBox = () =>{
  if(props.nisit.roleID==1){
    return(<div className="input-group mb-3">
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
  )
  }
}

  return (
    <div className="container">
      <h1>รายวิชาที่ยื่นขอเปิดรับ TA (หัวหน้าภาค)</h1>
      {searchBox()}
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
              <th rowSpan="2">ระดับ</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th rowSpan="2">ชื่อผู้ขอ</th>
              <th colSpan="2">จำนวนที่ขอ</th>
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
                  <td>{val.level}</td>
                  <td>{val.major}</td>
                  <td>{val.teacher}</td>
                  <td><Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalDetailTeacher"  onClick={()=>showModalTeacher(val)}>
                        {val.name} {val.lastname}
                      </a>
                    </Link></td>
                  <td>{val.number1}</td>
                  <td>{val.number2}</td>
                  <td>{val.noteapply}</td>
                  
                  <td>
                    <button
                      type="button"
                      class="btn btn-success"
                      onClick={()=>{if (window.confirm('ต้องการยืนยันวิชา: '+val.title))replyTAsuccess(val.CID,val.AID)}}
                      
                    >
                      ยืนยัน
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() =>  replyTAfail(val.CID,val.AID,val.title) }
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

export default connect(mapStateToProps, mapDispatchToProps)(HeadRequest);
