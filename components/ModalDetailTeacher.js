import React from "react";

export default function ModalDetailTeacher(props) {
 

  return (
    <div
      className="modal fade"
      id="ModalDetailTeacher"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      key={props.val.CID}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "blue" }}>
            <h5
              className="modal-title"
              id="exampleModalLabel"
              style={{ color: "white" }}
            >
              #ข้อมูลอาจารย์ผู้ขอ
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
            <p>อีเมลล์:  {props.val.email}    &emsp; ชื่ออีเมลล์: {props.val.name_email}</p>
            <p>ชื่อ-สกุล: {props.val.name} {props.val.lastname}     &emsp; ภาควิชา:{props.val.department} </p>
            <p>ตำแหน่ง: {props.val.roleTitle}     &emsp; เบอร์โทรศัพท์: {props.val.tel}</p>
            
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
