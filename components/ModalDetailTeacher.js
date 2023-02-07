import React from "react";

export default function ModalDetailTeacher(props) {
 

  //console.log(props.val)

  return (
    <div
      className="modal fade"
      id="ModalDetailTeacher"
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
              #ข้อมูลอาจารย์ {props.val.email}
            </h5>
            
          </div>
          <div className="modal-body">
            <p>อีเมลล์:  {props.val.email}    &emsp; ชื่ออีเมลล์: {props.val.name_email}</p>
            <p>ชื่อ-สกุล: {props.val.name} {props.val.lastname}     &emsp; ภาควิชา:{props.val.department} </p>
            <p>ตำแหน่ง: {props.val.roleTitle}     &emsp; เบอร์โทรศัพท์: {props.val.tel}</p>
            
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
