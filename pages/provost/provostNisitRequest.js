import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import ModalCourse from "../../components/ModalCourse";
import ModalDetailNisit from "../../components/ModalDetailNisit";
import ModalDetailTeacher from "../../components/ModalDetailTeacher";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";

function provostNisitRequest(props) {
  const [courses, setCourses] = useState([]);
  const [owner,setOwner] = useState([]);
  const [success, setSuccess] = useState(null);
  const [courseValue,setCourseValue] = useState([]);
  const [nisitValue,setNisitValue] = useState([]);
  
  const [session, loading] = useSession();
  

  useEffect(() => {
    async function getCourses() {
      const response = await Axios.get(`/courses/student-reply/1`);
      setCourses(response.data);  
    }
    getCourses();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

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
  const showModalNisit =  (val) =>{
    setNisitValue({
      CID:val.CID,
      email:val.email,
      name_email:val.name_email,
      name:val.name,
      lastname:val.lastname,
      lvl:val.lvl,
      department:val.department,
      roleTitle:val.roleTitle,
      tel:val.tel,
      nameBank:val.nameBank,
      idBank:val.idBank
    });
  }
  
  const showModalCourseOwner =  async (CID) =>{
    const response = await Axios.get(`/users/course-owner/${CID}`);
    setOwner(response.data[0]);
    // setOwner({
    //   email:response.data[0].email,
    //   name_email:response.data[0].name_email,
    //   name:response.data[0].name,
    //   lastname:response.data[0].lastname,
    //   department:response.data[0].department,
    //   roleTitle:response.data[0].roleTitle,
    //   tel:response.data[0].tel,
    // });
    
  }

  const NisitapplyID = (id) =>{
    let l = id.toString().length;
    if(l==1) return "SR00000"+id;
    else if(l==2) return "SR0000"+id;
    else if(l==3) return "SR000"+id;
    else if(l==4) return "SR00"+id;
    else if(l==5) return "SR0"+id;
    else if(l==6) return "SR"+id;
}

  const replyTAsuccess = async (AID) => {
    console.log("AID: ",AID);
    await Axios.put("/reply/student-reply", {
      email:session.user.email,
      studentapplyID: AID,
      status: 2,
    }).then((res) => {
      setCourses(res.data);
    });
  };

  const replyTAfail = async (userID,courseID) => {
    await Axios.put("/reply/student-reply", {
      userID: userID,
      courseID: courseID,
      status: 3,
    }).then((res) => {
      setCourses("response: ",res.data);
    });
  };

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    console.log("in that case");
    return (
      <div>
        <h2>You aren't signed in, please sign in first</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>รายชื่อนิสิตที่ยื่นขอ(อาจารย์ผู้สอน)</h1>
      <div className="information">
    
      {success && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success}{" "}
            </div>
      )}
        จำนวนคำร้อง:{courses != null && courses.length != 0 ? courses.length : 0}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสคำขอ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อาจารย์</th>
              <th rowSpan="2">อาจารย์เจ้าของวิชา</th>
              <th rowSpan="2">ชื่อผู้ยื่น</th>
              <th rowSpan="2">เหตุผล</th>
              <th rowSpan="2">ตอบกลับคำร้อง</th>
            </tr>
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((val, key) => {
              return (
                <tr>
                  <td>{key + 1,val.CID}</td>
                  <td>{NisitapplyID(val.AID)}</td>
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
                  <td>{val.teacher}</td>
                  <td>
                    <button type="button" className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#ModalDetailTeacher"  onClick={() => showModalCourseOwner(val.CID)} >
                      ดูข้อมูล
                    </button>  
                  </td>
                  <td>
                  <Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalDetailNisit"  onClick={()=>showModalNisit(val)}>
                        {val.name_email}
                      </a>
                    </Link>
                  </td>
                  <td>{val.noteapply}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-success"
                      key={key}
                      onClick={() => {if (window.confirm('ต้องการยืนยันวิชา: '+val.title))replyTAsuccess(val.AID)}}
                      
                    >
                      ยืนยัน
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      key={key}
                      onClick={() => {if (window.confirm('ต้องการยืนยันวิชา: '+val.title))replyTAfail(val.userID,val.id)} }
                      
                    >
                      ยกเลิก
                    </button>
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
        <ModalCourse val={courseValue} />
        <ModalDetailNisit val={nisitValue}  />
        <ModalDetailTeacher val={owner} />
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

export default connect(mapStateToProps, mapDispatchToProps)(provostNisitRequest);