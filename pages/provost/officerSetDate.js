import React, { useState } from "react";
import Axios from "../../config/Axios";
import { useSession } from "next-auth/client";

export default function officerSetDate() {

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear() + 543);
  const [term, setTerm] = useState(null);
  const [openDate, setOpenDate] = useState(null);
  const [closeDate, setCloseDate] = useState(null);
  const [titleDay,setTitleDay] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [err1,setErr1] = useState(null);
  const [err2,setErr2] = useState(null);
  const [success1,setSuccess1] = useState(null);
  const [success2,setSuccess2] = useState(null);
  const [session, loading] = useSession();
  


  const setDateStudy = async() =>{  
    if(!year){
        setErr1("กรุณากรอกปีการศึกษา");
    }
    else if(!term){
        setErr1("กรุณาเลือกภาคเรียน");
    }
    else if(!openDate){
        setErr1("กรุณาเลือกวันที่เริ่ม");
    }
    else if(!closeDate){
        setErr1("กรุณาเลือกวันสุดท้าย");
    }
    else{
        await Axios.post("/setdate/setDateStudy",{
          year:year,
          term:term,
          openDate:openDate,
          closeDate:closeDate
        }).then((response)=>{
          setErr1(null);
          setSuccess1(response.data);
        });
    }
  }
  const setDateStop = async() =>{
    if(!titleDay){
      setErr2("กรุณากรอกหัวข้อวันหยุด");
    }
    else if(!startDate){
      setErr2("กรุณาเลือกวันที่เริ่มหยุด");
    }
    else if(!endDate){
      setErr2("วันกรุณาเลือกสุดท้ายที่หยุด");
    }
    else{
      await Axios.post("/setdate/setDateStop",{
        title:titleDay,
        startDate:startDate,
        endDate:endDate
      }).then((response)=>{
        setErr2(null);
        setSuccess2(response.data);
      });
    }
  }
  

  return (
    <div className="container">
      <h1>ตั้งค่าวันที่</h1>

      <hr />
      <h2>ตั้งค่าวันเรียน</h2>
      <div class="information">
        <form
          class="row gy-2 gx-3 align-items-center"
        >
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              ปีการศึกษา
            </label>
            <input
              value={today.getFullYear() + 543}
              type="text"
              className="form-control"
              name="year"
              placeholder="ปีการศึกษา"
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </div>
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              ภาคเรียน
            </label>
            <select
              name="term"
              class="form-select"
              onChange={(e) => {
                setTerm(e.target.value);
              }}
            >
              <option value={null} disabled selected hidden>
                ภาคเรียน
              </option>
              <option value="ฤดูร้อน">ฤดูร้อน</option>
              <option value="ต้น">ต้น</option>
              <option value="ปลาย">ปลาย</option>
            </select>
          </div>
          <div class="col-auto">
            <label for="openDate" class="form-label">
              เริ่ม
            </label>
            <input
              
              type="date"
              className="form-control"
              name="openDate"
              id="openDate"
              
              onChange={(e) => {
                setOpenDate(e.target.value);
              }}
            />
          </div>
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              สุดท้าย
            </label>
            <input
              type="date"
              className="form-control"
              name="closeDate"
              id="closeDate"
              onChange={(e) => {
                setCloseDate(e.target.value);
              }}
            />
          </div>

          {err1 && <div className="alert alert-danger" role="alert"> {err1} </div> }
          {success1 && <div className="alert alert-success" role="alert"> {success1} </div> }

          <div className="mb-3">
            <button type="button" className="btn btn-success" onClick={setDateStudy}>
              บันทึก
            </button>
          </div>

        </form>
      </div>

      <h2>ตั้งค่าวันหยุด</h2>
      <div class="information">
        <form
          class="row gy-2 gx-3 align-items-center"
          encType="multipart/form-data"
          
        >
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              หัวข้อวันหยุด
            </label>
            <input
              
              type="text"
              className="form-control"
              name="year"
              placeholder="หยุดเนื่องในวัน"
              onChange={(e) => {
                setTitleDay(e.target.value);
              }}
            />
          </div>

          <div class="col-auto">
            <label for="startDate" class="form-label">
              ตั้งแต่
            </label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              id="startDate"
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div class="col-auto">
            <label for="endDate" class="form-label">
              ถึง
            </label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              id="endDate"
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
          {err2 && <div className="alert alert-danger" role="alert"> {err2} </div> }
          {success2 && <div className="alert alert-success" role="alert"> {success2} </div> }
          <div className="mb-3">
            <button type="button" className="btn btn-success" onClick={setDateStop}>
              บันทึก
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
