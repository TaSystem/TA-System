import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";


function provostHItoryApply(props) {
  const [session, loading] = useSession();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState(null);
  const [yearSearch, setYearSearch] = useState([]);
  const [year, setYear] = useState(null);
  const [term, setTerm] = useState(null);
  const [major, setMajor] = useState(null);
  

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
      async function getCourses(){
        const response = await Axios.get(`/courses/teacher-apply/${session.user.email}`);
        setCourses(response.data)
    }
    async function getYear() {
      const response = await Axios.get("/courses/year");
      setYearSearch(response.data);
    }
    getYear();
    getCourses(); 
    }

  }, [loading]);

  const condition=(status)=>{
    if(status === 1){
      return <td><p style={{ backgroundColor: "#E3E726", color: "white",borderRadius:"6px",padding:"3px" }}>รอดำเนินการจากเจ้าหน้าที</p> </td>
    }
    else if(status === 2){
      return <td><p style={{ backgroundColor: "#E3E726", color: "white",borderRadius:"6px",padding:"3px" }}>รอดำเนินการจากหัวหน้าภาค</p> </td>
    }
    else if(status === 3){
        return <td><p style={{ backgroundColor: "#E3E726", color: "white",borderRadius:"6px",padding:"3px" }}>รอดำเนินการจากรองคณบดี</p> </td>
    }
    else if(status === 4){
        return <td><p style={{ backgroundColor: "#E3E726", color: "white",borderRadius:"6px",padding:"3px" }}>รอดำเนินทำเอกสารการจากเจ้าหน้าที</p> </td>
    }
    else if(status === 5){
      return <td><p style={{ backgroundColor: "#0E7ADD", color: "white",borderRadius:"6px",padding:"3px" }}>ขอTAสำเร็จ</p> </td>
  }
    else{
      return <td><p style={{ backgroundColor: "#DD0E0E", color: "white",borderRadius:"6px",padding:"3px" }}>ขอTAไม่ผ่าน</p> </td>
    }
  }
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

  return (
    <div className="container">
      <h1>รายวิชาทั้งหมดที่ยื่นขอSA</h1>
      <div className="information">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ชื่อวิชา/รหัสวิชา/อาจารย์"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          name="year"
          onChange = { (e) => {
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
        {term&&<option value="วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ">
            วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ(ป.ตรี)
        </option>}
        </select>
      </div>
      จำนวนคำร้องทั้งหมด: {courses != null && courses.length != 0 ? courses.length : 0}
      <div className="table-responsive" style={{maxHeight:"70vh",maxWidth:"80vw",marginTop:"1vh"}}>
        <table className="table table-hover table-bordered" cellspacing="0" style={{textAlign:"center"}}>
          <thead style={{position:"sticky",top:0,background:"#7a0117",color:"#fff",fontWeight:"400"}}>
            <tr>
              <th>ลำดับ</th>
              <th>รหัสวิชา</th>
              <th>ชื่อวิชา</th>
              <th>ระดับ</th>
              <th>สาขาวิชา</th>
              <th>ปีการศึกษา</th>
              <th>เทอมการศึกษา</th>
              <th>อาจารย์ผู้ขอ</th>
              <th>จำนวนนิสิตที่ขอ</th>
              <th>สถานะ</th>

            </tr>
          </thead>
          <tbody>
            {Filter(courses).map((val, key) => {
              return (
                <tr>
                  <td> {key+1}</td>
                  <td>{val.courseID}</td>
                  <td>{val.title}</td>
                  <td>{val.level}</td>
                  <td>{val.major}</td>
                  <td>{val.year}</td>
                  <td>{val.term}</td>
                  <td>{val.name} {val.lastname}</td>
                  <td>{val.number1+val.number2}</td>
                  <td>{condition(val.status)}</td>
                  

                  
                </tr>
              );
            })}
            {courses && !courses.length && <h2 style={{color:"red"}}>ยังไม่เคยยื่นขอ</h2> }
          </tbody>
        </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(provostHItoryApply);

