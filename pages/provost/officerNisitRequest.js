import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";

function officerNisitRequest(props) {
  const [courses, setCourses] = useState([]);
  const [success, setSuccess] = useState(null);
  const [session, loading] = useSession();
  

  useEffect(() => {
    async function getCourses() {
      const response = await Axios.post("/courses/student-reply",{
          status:2
      });
      setCourses(response.data);  
    }
    getCourses();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

  const replyTAsuccess = async (userID,courseID) => {
    await Axios.put("/reply/student-reply", {
      email:session.user.email,
      courseID: courseID,
      status: 3,
    }).then((res) => {
      setCourses(res.data);
    });
  };

  const replyTAfail = async (userID,courseID) => {
    await Axios.put("/reply/student-reply", {
      userID: userID,
      courseID: courseID,
      status: 0,
    }).then((res) => {
      console.log(res.data);
      setCourses(res.data);
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
      <h1>รายชื่อนิสิตที่ยื่นขอ(เจ้าหน้าที่)</h1>
      <div className="information">
      <button type="submit" className="btn btn-success">
          พิมพ์เอกสารอนุมัติหลักการ
        </button>
        <p style={{color:"red"}} > 
        * 1.ยกเลิกคำขอของนิสิตที่ไม่ผ่านการเป็น SA ก่อน
          2.พิมพ์เอกสารตามภาควิชานั้นๆโดยการเลือก
          3.หลังพิมเอกสารยืนยันคำร้องนิสิตคนนั้นจะเป็น SA 
        </p>
      {success && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success}{" "}
            </div>
      )}
       จำนวนคำร้อง:{courses != null && courses.length != 0 ? courses.length : "loading..."}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th rowSpan="2">ระดับ</th>
              <th colSpan="2">หมู่เรียน</th>
              <th rowSpan="2">สาขาวิชา</th>
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
                  <td>{key + 1}</td>
                  <td>{val.courseID}</td>
                  <td>{val.title}</td>
                  <td>{val.level}</td>
                  <td>{val.sec_D ? val.sec_D : "-"}</td>
                  <td>{val.sec_P ? val.sec_P : "-"}</td>
                  <td>{val.major}</td>
                  <td>{val.name_email}</td>
                  <td>{val.noteapply}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-success"
                      key={key}
                      onClick={() => {if (window.confirm('ต้องการยืนยันวิชา: '+val.title))replyTAsuccess(val.userID,val.id)}}
                      
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

export default connect(mapStateToProps, mapDispatchToProps)(officerNisitRequest);