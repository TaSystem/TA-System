import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ModalTeacher(props) {
  
  const router = useRouter();

  const applyTa = async () => {
    return router.push(`/provost/provostCourses/${props.val.id}`);
  };


  const NumberTA = () => {
    if (props.val.numberTA) {
      return (
        <div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              style={{width:"130px"}}
            >
              ปิด
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
              onClick={() => applyTa()}
              style={{width:"130px"}}
            >
              ขอนิสิตช่วยงาน
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p style={{ color: "red" }}>(ขอTAไม่ได้)</p>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              style={{width:"130px"}}
            >
              ปิด
            </button>
          </div>
        </div>
      );
    }
  };

  const secNumber = () => {
    if (props.val.sec_P && props.val.sec_D) {
      const sec = props.val.sec_D + "," + props.val.sec_P;
      return sec;
    } else if (props.val.sec_P) return props.val.sec_P;
    else if (props.val.sec_D) return props.val.sec_D;
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
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
            <p>ชื่อวิชา: {props.val.title}</p>
            <p>
              รหัสวิชา: {props.val.courseID} หมู่เรียน:{secNumber()}
            </p>
            <p>
              ระดับ: {props.val.level} สาขาวิชา: {props.val.major}{" "}
            </p>
            <p>
              อาจารย์ผู้สอน: {props.val.teacher} จำนวนนิสิตที่รับ:{" "}
              {props.val.number_D ? props.val.number_D : props.val.number_P} คน
            </p>
            {NumberTA()}
          </div>
        </div>
      </div>
    </div>
  );
}
