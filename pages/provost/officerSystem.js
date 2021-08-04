import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";

export default function officerSystem() {
  const [systemTeacher, setSystemTeacher] = useState(null);
  const [systemStudent, setSystemStudent] = useState(null);
  

  useEffect(() => {
    async function getSystems() {
      const responseTeacher = await Axios.get("/system/1");
      const responseStudent = await Axios.get("/system/2");
      setSystemTeacher(responseTeacher.data[0].status);
      setSystemStudent(responseStudent.data[0].status);
    }
    getSystems();
  }, []);

  

  
  async function handleTeacherSystem() {
    setSystemTeacher(!systemTeacher);
    if(systemTeacher == 1){
        const status = 0;
        await Axios.put("/system",{
            id:1,
            status:status
         }) 
    }
    else if(systemTeacher == 0){
        const status = 1;
        await Axios.put("/system",{
            id:1,
            status:status
         }) 
    }
  }

  async function handleStudentSystem() {
    setSystemStudent(!systemStudent);
    if(systemStudent == 1){
        const status = 0;
        await Axios.put("/system",{
            id:2,
            status:status
         }) 
    }
    else if(systemStudent == 0){
        const status = 1;
        await Axios.put("/system",{
            id:2,
            status:status
         }) 
    }
    
  }

  return (
    <div className="container">
      <h2>Systems</h2>
      <h3>ระบบอาจารย์: {systemTeacher?"เปิด":"ปิด"} ระบบนิสิต: {systemStudent?"เปิด":"ปิด"}</h3>
      <div class="information">
        <button type="button" class={systemTeacher?"btn btn-danger":"btn btn-success"} onClick={()=>{if (window.confirm(systemTeacher?"ต้องการปิดระบบใช่หรือไม่":"ต้องการเปิดระบบใช่หรือไม่")) handleTeacherSystem()}}>
          {systemTeacher?"ปิดระบบรับสมัครอารจารย์":"เปิดระบบรับสมัครอารจารย์"}
        </button>
        <button type="button" class={systemStudent?"btn btn-danger":"btn btn-success"} onClick={()=>{if (window.confirm(systemTeacher?"ต้องการปิดระบบใช่หรือไม่":"ต้องการเปิดระบบใช่หรือไม่")) handleStudentSystem()}}>
          {systemStudent?"ปิดระบบรับสมัครนักเรียน":"เปิดระบบรับสมัครนักเรียน"}
        </button>
      </div>
    </div>
  );
}
