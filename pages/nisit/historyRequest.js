import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import {
  getDetailNisit,
  getCoursesNisit,
} from "../../redux/actions/nisitAction";
import { useRouter } from "next/router";



function historyReqest(props) {
  const [courses, setCourses] = useState([]);
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session){
      console.log("useEffect 1");
    async function getCourses() {
      const response = await Axios.post("/courses/student-apply",{
        email:session.user.email
      });
      setCourses(response.data);
      session ? props.getCoursesNisit(session.user.email) : null
    }
    getCourses();
    }
    
  }, [loading]);

  useEffect(() => {
    // console.log("useEffect 2");
    if (session && props.nisit.length == 0) {
      console.log("useEffect get getDetailNisit");
      props.getDetailNisit(session.user.email);
    }
    if (session) {
      console.log("useEffect get getCoursesNisit");
      props.getCoursesNisit(session.user.email);
    }
  }, [loading]);

  const condition = (status) => {
    if (status === 1) {
      return (
        <>
          <p style={{ backgroundColor: "#E3E726", color: "black" }}>
            รอดำเนินการจากอาจารย์
          </p>
        </>
      );
    } else if (status === 2) {
      return (
        <>
          <p style={{ backgroundColor: "#E3E726", color: "black" }}>
            รอดำเนินการจากเจ้าหน้าที่
          </p>
        </>
      );
    }else if (status === 3) {
      return (
        <>
          <p style={{ backgroundColor: "#32CD32", color: "black" }}>
            ขอTAสำเร็จ
          </p>
        </>
      );
    }else {
      return (
        <>
          <p style={{ backgroundColor: "#DD0E0E", color: "white" }}>
            ขอTAไม่ผ่าน
          </p>{" "}
        </>
      );
    }
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
  // console.log("props in history  >> ", props);
  // console.log("session in history ", session);
  // console.log("router in history ", router.pathname);
  // console.log("props Courses in history ", props.courses);
  // console.log("Courses in history ", courses);

  return (
    <div className="container">
      <h1>รายวิชาที่ยื่นขอ {props.nisit.email}</h1>
      <div className="information">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รหัสวิชา</th>
              <th>ชื่อวิชา</th>
              <th>ระดับ</th>
              <th>สาขาวิชา</th>
              <th>ดูข้อมูล</th>
              <th>สถานะ</th>
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
                  <td>{val.major}</td>
                  <td>ดูข้อมูล</td>
                  <td>{condition(val.status)}</td>
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
  courses: state.nisit.courses,
});

const mapDispatchToProps  = {
  // setRegisterNisit: setRegisterNisit,
  getDetailNisit: getDetailNisit,
  getCoursesNisit: getCoursesNisit,
};

export default connect(mapStateToProps, mapDispatchToProps )(historyReqest);
