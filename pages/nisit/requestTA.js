import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import {
  getDetailNisit,
  getCoursesNisit,
} from "../../redux/actions/nisitAction";

function requestTA(props) {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [note, setNote] = useState(null);
  const [session, loading] = useSession();

  useEffect(() => {
    async function getCourses() {
      const response = await Axios.get("/courses/student");
      setCourseList(response.data);
    }
    getCourses();
  }, []);

  useEffect(() => {
    // console.log("useEffect 2");
    if (session && props.nisit.length == 0) {
      console.log("useEffect get getDetailNisit");
      props.getDetailNisit(session.user.email);
    }
    // if (session && props.courses.length == 0){
    console.log("useEffect get getCoursesNisit");
    // }
  }, [loading]);

  const applyTA = async (id) => {
    console.log(id);
    await Axios.post("/apply/student-apply", {
      userID: props.nisit.userID,
      courseID: id,
      hrperweek:5,
      status: 1,
      noteapply: note,
    }).then((res) => {
      console.log(res.data);
    });
  };

  const secNumber = (D, P) => {
    if (P && D) {
      const sec = D + "," + P;
      return sec;
    } else if (P) return P;
    else if (D) return D;
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

  console.log("props in requestTA  >> ", props.nisit);
  console.log("session in requestTA ", session);
  
  const hourTA =(d,p)=>{
    if(d&&p) return 5
    else if(d)  return 2
    else if(p)  return 3
  }

//จำนวนชั่วโฒง
  return (
    <div className="container">
      <h1>ลงทะเบียนTA {props.nisit.level=="ปริญญาตรี"?"(ขอได้ไม่เกิน 10 ชั่วโมง)":"(ขอได้ไม่จำกัดชั่วโมง)"}</h1>
      <h2>ปี 2564 เทอม ปลาย</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="ค้นหาข้อมูล..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="information">
        {courseList
          .filter((val) => {
            if (!search) {
              return val;
            } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
              return val;
            } else if (
              val.courseID.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            } else {
              return null;
            }
          })
          .map((val, key) => {
            return (
              <div class="card text-center mb-2">
                <div class="card-header">{val.courseID}</div>
                <div class="card-body">
                  <h5 class="card-title">
                    {val.title} หมู่เรียน {secNumber(val.sec_D, val.sec_P)}{" "}
                  </h5>
                  <p class="card-text">
                    เวลาเรียนบรรยาย {val.day_D ? val.day_D : ""}{" "}
                    {val.start_D ? val.start_D + " - " + val.end_D : ""}
                  </p>
                  <p class="card-text">
                    เวลาเรียนปฎิบัติ {val.day_P ? val.day_P : "-"}{" "}
                    {val.start_P ? val.start_P + " - " + val.end_P : ""}
                  </p>
                  <p class="card-text">
                    คณะ:{val.major} อาจารย์:{val.teacher}
                  </p>

                  <form>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        name="note"
                        id="button-addon1"
                        placeholder="หมายเหตุ(ไม่กรอกก็ได้)"
                        onChange={(e) => setNote(e.target.value)}
                        key={key}
                      />
                      <button
                        type="submit"
                        class="btn btn-success"
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        onClick={() => applyTA(val.id,hourTA(val.sec_D,val.sec_P))}
                      >
                        ส่งคำร้อง{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
  courses: state.nisit.courses,
});

const mapDispathToProps = {
  // setRegisterNisit: setRegisterNisit,
  getDetailNisit: getDetailNisit,
  getCoursesNisit: getCoursesNisit,
};

export default connect(mapStateToProps, mapDispathToProps)(requestTA);
