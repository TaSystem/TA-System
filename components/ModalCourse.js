import React from "react";

export default function ModalCourse(props) {

  const showSec = (sec_P) => {
    let arraySec = sec_P?.split("_");
    return arraySec?.map((val, index) => {
      if (arraySec.length == index + 1) {
        return <>{val}</>;
      } else {
        return <>{val},</>;
      }
    });
  };

  const hourP = (day, start, end) => {
    if (day && start && end) {
      let dayArray = day.split("_");
      let startArray = start.split("_");
      let endArray = end.split("_");
      return dayArray.map((val, index) => {
        return (
          <p key={index}>
            เวลาเรียนปฎิบัติ วัน {dayArray[index]} เวลา {startArray[index]} -{" "}
            {endArray[index]}{" "}
          </p>
        );
      });
    } else {
      return null
    }
  };
  
  

  return (
    <div
      className="modal fade"
      id="ModalCourse"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#7a0117" }}>
            <h5
              className="modal-title"
              id="exampleModalLabel"
              style={{ color: "white" }}
            >
              #ข้อมูลรายวิชา
            </h5>
            
          </div>
          <div className="modal-body">
            <p>ชื่อวิชา: {props.val != null && props.val.length != 0 ? props.val.title : "loading..."}</p>
            <p>
              รหัสวิชา: {props.val.courseID}  &emsp; หมู่เรียน:{props.val.sec_D}{props.val.sec_D&& props.val.sec_P ?",":""}{showSec(props.val.sec_P)} {" "}
              {props.val.sec_D&&!props.val.sec_P &&"(บรรยาย)"}{!props.val.sec_D&&props.val.sec_P&&"(ปฎิบัติ)"}{props.val.sec_D&& props.val.sec_P && "(บรรยายและปฎิบัติ)"}
            </p>
            <p>
              ระดับ: {props.val.level} &emsp; สาขาวิชา: {props.val.major}
            </p>
            <p>
              อาจารย์ผู้สอน: {props.val.teacher}  
            </p>
              จำนวนนิสิตที่รับ: {props.val.number_D ? props.val.number_D : props.val.number_P} คน &emsp; 
              จำนวนนิสิตที่ลง: {props.val.numberReal?props.val.numberReal:0} คน
            <p>
            </p>
            <p>
              {props.val.day_D && "วันเวลาเรียนบรรยาย: "+props.val.day_D +" - "+props.val.start_D+"-"+props.val.end_D } 
            </p>
           
            {hourP(props.val.day_P, props.val.start_P, props.val.end_P)}
            
            
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
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
