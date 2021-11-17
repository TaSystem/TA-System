import React from "react";

export default function ModalCourse(props) {
  const secNumber = () => {
    if (props.val.sec_P && props.val.sec_D) {
      const sec = props.val.sec_D + "," + props.val.sec_P +" (บรรยายและปฎิบัติ)";
      return sec;
    } else if (props.val.sec_P) return props.val.sec_P+" (ปฎิบัติ)";
    else if (props.val.sec_D) return props.val.sec_D+" (บรรยาย)";
  };
  

  return (
    <div
      className="modal fade"
      id="ModalCourse"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "blue" }}>
            <h5
              className="modal-title"
              id="exampleModalLabel"
              style={{ color: "white" }}
            >
              #ข้อมูลรายวิชา
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
            <p>ชื่อวิชา: {props.val != null && props.val.length != 0 ? props.val.title : "loading..."}</p>
            <p>
              รหัสวิชา: {props.val.courseID}  &emsp; หมู่เรียน:{secNumber()}
            </p>
            <p>
              ระดับ: {props.val.level} &emsp; สาขาวิชา: {props.val.major}
            </p>
            <p>
              อาจารย์ผู้สอน: {props.val.teacher}  &emsp; จำนวนนิสิตที่รับ:
              {props.val.number_D ? props.val.number_D : props.val.number_P} คน
            </p>
            <p>
              {props.val.day_D && "วันเวลาเรียนบรรยาย: "+props.val.day_D +" - "+props.val.start_D+"-"+props.val.end_D } 
            </p>
            <p>
              {props.val.day_P && "วันเวลาเรียนปฎิบัติ: "+props.val.day_P +" - "+props.val.start_P+"-"+props.val.end_P } 
            </p>
            
            
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
