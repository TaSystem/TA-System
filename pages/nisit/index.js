import { signIn, signOut, useSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SelectMajor from "../../components/SelectMajor";
import Axios from "../../config/Axios";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import ApplicationNisitSA from '../../components/form/ApplicationNisitSA'
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';

function index(props) {

  const componentRef = React.useRef();
  const [courseList, setCourseList] = useState([]);
  
  const [yearNow,setYearNow] = useState([]);
  const [session, loading] = useSession();
  const [search, setSearch] = useState(null);
  const [major, setMajor] = useState("All");
  const [data,setData] = useState([1]);
  const router = useRouter();

  useEffect(() => {
    // async function getCourses() {
    if (session) {
      Axios.get(`/courses/student-apply-success/${session.user.email}`)
      .then((res) => {
        // console.log("index Nisit : ", res.data , 'my email is ',session.user.email);
        setCourseList(res.data);
      });
      async function getYear() {
        const response = await Axios.get("/setdate/getNow");
        setYearNow(response.data);
      }
      getYear();
    }
    // }
    // getCourses();
  }, [loading]);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }
  }, [loading]);

  class Sumhour extends Array {
    sum(key) {
        return this.reduce((a, b) => a + (b[key] || 0), 0);
    }
  }
  const sumHour = new Sumhour(...courseList);

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

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    // console.log("in that case");
    // router.push('/')
    return (
      <div>
        <h2>You aren't signed in, please sign in firstsss</h2>
      </div>
    );
  }


  // console.log("session in nisit ", session);

  return (
    <div className="container">
      <h1>รายวิชาที่เป็น SA (จำนวนชั่วโมงป.ตรี 10 ชม ป.โทไม่มีจำกัด)</h1>
      <h2>ปี {yearNow != null && yearNow.length != 0 ? yearNow[0].year : "loading..."} เทอม {yearNow != null && yearNow.length != 0 ? yearNow[0].term : "loading..."}  </h2>
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
      
      <div style ={{margin:'12px auto'}}>
      {(data?.length >0) ? (   
      <ReactToPrint
        trigger={() => <button type="submit" className="btn btn-danger">
        ดาวโหลดใบสมัครนิสิตช่วยปฎิบัติงาน (PDF)
      </button>}
        content={() => componentRef.current}
      />):(<button className="btn btn-danger"  onClick = {()=>{alert('กรุณาเลือกสาขา')}}>ดาวโหลดข้อมูลเอกสารค่าใช้จ่าย(PDF) </button>)}
      </div>

        {/* <div style= {{display:'none'}}> */}
        <ApplicationNisitSA ref = {componentRef}/>
        {/* </div> */}
      
      จำนวน:{courseList != null && courseList.length != 0 ? courseList.length : 0} วิชา &emsp; เวลาทำงานรวม: {courseList != null && courseList.length != 0 ? sumHour.sum('hrperweek') : 0} ชั่วโมง
      <div className="table-responsive" style={{maxHeight:"65vh",maxWidth:"80vw",marginTop:"1vh"}}>
        <table className="table table-hover table-bordered" cellspacing="0" style={{textAlign:"center"}}>
          <thead style={{position:"sticky",top:0,background:"#7a0117",color:"#fff",fontWeight:"400"}}>
            <tr>
              <th rowSpan="2">#</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th colSpan="2">เวลาเรียน</th>
              <th rowSpan="2">ระดับ</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th rowSpan="2">เวลาทำงาน</th>
            </tr>
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
              
            </tr>
          </thead>
          <tbody>
            {Filter(courseList).map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{val.courseID}</td>
                    <td>{val.title}</td>
                    <td>{val.sec_D ? val.sec_D : "-"} </td>
                    <td>{val.sec_P ? val.sec_P : "-"}</td>
                    <td>{val.day_D ? val.day_D : ""} {val.start_D ? val.start_D + " - " + val.end_D : ""}</td>
                    
                    <td>{val.day_P ? val.day_P : ""} {val.start_P ? val.start_P + " - " + val.end_P : ""}</td>
                    
                    <td>{val.level}</td>
                    <td>{val.major}</td>
                    <td>{val.teacher}</td>
                    <td>{val.hrperweek}</td>
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