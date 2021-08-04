import { useState } from "react";
import Axios from "../config/Axios";

export default function ModalTeacher(props) {
  const [numberTA, setNumberTA] = useState(null);
  const [err, setErr] = useState(null);

  const applyTa = async () => {
    console.log("post: ", props.id);
    if (numberTA > props.numberTA) {
      setErr("ขอได้ไม่เกิน " + props.numberTA + " คน");
    } else if (!numberTA) {
      setErr("กรุณากรอกข้อมูล");
    } else if (numberTA <= 0) {
      setErr("กรุณากรอกจำนวนที่มากกว่า 0");
    } else if (numberTA > 0 && numberTA <= props.numberTA) {
      const res = await Axios.post("/apply/teacher-apply", {
        userID: 13,
        courseID: props.id,
        number: numberTA,
        status: 1,
      });
      console.log(res.data);
      setErr(null);
      setNumberTA(null);
    }
  };

  const handlevalidate = (e) => {
    setNumberTA(e.target.value);
    // if(numberTA > 2){
    //   setErr("ขอได้ไม่เกิน 2 คน");
    // }
    // else if(numberTA <= 0){
    //   setErr("กรุณากรอกจำนวนที่มากกว่า 0")
    // }
    // else if(numberTA > 0 && numberTA <= 2){
    //   setErr(null)
    // }
  };

  const secNumber = (D, P) => {
    if (P && D) {
      const sec = D + "," + P;
      return sec;
    } else if (P) return P;
    else if (D) return D;
  };

  const NumberTA = () => {
    console.log("numberTa call");
    if (props.numberTA) {
      return (
        <div>
          <form className="form-floating">
            <input
              className="form-control mb-2"
              type="number"
              name="numberTA"
              placeholder="กรอกจำนวน TA ที่ต้องการ"
              onChange={handlevalidate}
              key={props.id}
            />
            <label htmlFor="numberTA">
              กรอกจำนวน TA ที่ต้องการ(ขอได้ไม่เกิน {props.numberTA} คน)
            </label>
            {err && (
              <div
                className="alert alert-danger"
                role="alert"
                key={props.id + 999}
              >
                {" "}
                {err}{" "}
              </div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  setErr(null);
                  setNumberTA(null);
                }}
              >
                ปิด
              </button>
              <button
                type="button"
                className="btn btn-success"
                value="ส่งคำร้อง"
                onClick={() => applyTa()}
              >
                ส่งคำร้อง
              </button>
            </div>
          </form>
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
            >
              ปิด
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
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
            <p>ชื่อวิชา: {props.title}</p>
            <p>
              รหัสวิชา: {props.courseID} หมู่เรียน:
              {secNumber(props.sec_D, props.sec_P)}
            </p>
            <p>
              ระดับ: {props.level} สาขาวิชา: {props.major}{" "}
            </p>
            <p>
              อาจารย์ผู้สอน: {props.teacher} จำนวนนิสิตที่รับ:{" "}
              {props.number_D ? props.number_D : props.number_P} คน
            </p>
            {NumberTA()}
          </div>
        </div>
      </div>
    </div>
  );
}
