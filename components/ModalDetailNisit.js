import React from "react";
import Image from "next/image";


export default function ModalDetailNisit(props) {
 

  console.log(props.val)

  return (
    <div
      className="modal fade"
      id="ModalDetailNisit"
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
              #ข้อมูลนิสิต 
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
            <p>ชื่ออีเมลล์: {props.val.name_email}</p>
            <p>ชื่อ-สกุล: {props.val.name} {props.val.lastname} &emsp; รหัสนิสิต: {props.val.idStudent} </p>
            <p>ระดับ: {props.val.lvl} &emsp; ภาควิชา:{props.val.department}</p>
            <p>อีเมลล์: {props.val.email}     &emsp; เบอร์โทรศัพท์: {props.val.tel}</p>
            <p>ชิ่อธนาคาร: {props.val.nameBank}     &emsp; เลขบัญชี: {props.val.idBank}</p>
            <Image src={require(`../backend/uploads/img/fileCardStudent-1626268177640.jpg`)} alt="fileCardStudent" width={220} height={220} />
            <Image src={require(`../backend/uploads/img/fileCardStudent-1626268177640.jpg`)} alt="fileCardStudent" width={220} height={220} />
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
