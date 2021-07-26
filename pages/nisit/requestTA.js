import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";

export default function requestTA() {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [note,setNote] = useState(null);

  useEffect(() => {
    async function getCourses() {
      const response = await Axios.get("/courses/student");
      setCourseList(response.data);
    }
    getCourses();
  }, []);

  const applyTA = async (id) =>{
    await Axios.post("/apply/student-apply",{
      userID : 34,
      courseID: id,
      status:1,
      note:note
    }).then((res)=>{
      console.log(res.data);
    })

  }

  const secNumber = (D, P) => {
    if (P && D) {
      const sec = D + "," + P;
      return sec;
    } else if (P) return P;
    else if (D) return D;
  };

  return (
    <div className="container">
      <h1>ลงทะเบียนTA</h1>
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
              return null;
            } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
              return val;
            } else if (
              val.courseID.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
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
                  <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    ลงทะเบียน
                  </a>
                  <div class="collapse mt-2" id="collapseExample">
                    <form className="form-floating"  >   
                      <input type="text" class="form-control mb-3" name="note" placeholder="หมายเหตุ(ไม่กรอกก็ได้)" onChange={(e)=>setNote(e.target.value)} />
                      <label htmlFor="note">หมายเหตุ(ไม่กรอกก็ได้)</label> 
                      <button type="submit" class="btn btn-success" onClick={()=>applyTA(val.id)}>ส่งคำร้อง </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
