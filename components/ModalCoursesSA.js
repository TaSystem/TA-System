import React from "react";

export default function ModalCoursesSA(props) {
 
  

  return (
    <div
      className="modal fade"
      id="ModalCoursesSA"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"

    >
      <div className="modal-dialog" style={{maxWidth:"70%"}}>
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "blue" }}>
            <h5
              className="modal-title"
              id="exampleModalLabel"
              style={{ color: "white" }}
            >
              #รายวิชาที่รับผิดชอบ
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ backgroundColor: "red" }}
            ></button>
          </div>
          <div className="modal-body">
            <p> ชื่อ-นามสกุล: {props.user.name} {props.user.lastname} &emsp; เวลาทำงานรวม: {props.user.workHour} ชั่วโมง</p>
            <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th colSpan="2">เวลาเรียน</th>
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
          {props.courses.map((val, key) => {
              return (
                <tr key={key}>

                  <td>{key + 1}</td>
                  <td>{val.courseID}</td>
                  <td>{val.title}</td>
                  <td>{val.sec_D ? val.sec_D : "-"}</td>
                  <td>{val.sec_P ? val.sec_P : "-"}</td>
                  <td>{val.day_D?val.day_D+" "+val.start_D+"-"+val.end_D:"-" } </td>
                  <td>{val.day_P?val.day_P+" "+val.start_P+"-"+val.end_P:"-" } </td>  
                  <td>{val.major}</td>
                  <td>{val.teacher}</td>   
                  <td>{val.hrperweek} ชั่วโมง</td>    
                </tr>
              );
            })}
            
          </tbody>
        </table>
        
            
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
