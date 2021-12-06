import React from "react";
import Image from "next/image";
import Axios from "../config/Axios";

export default function ModalDetailNisit(props) {
 

  //console.log(props.role)

  const downloadCard = async () =>{
    Axios({
      url: `/download-filecard/${props.val.fileCardStudent}`, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', `${props.val.idStudent}`+"-fileCardStudent.jpg"); //or any other extension
       document.body.appendChild(link);
       link.click();
    }); 
  }
  const downloadBookBank = async () =>{
    Axios({
      url: `/download-filebookbank/${props.val.fileBookBank}`, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       //console.log("response: ",response.data)
       const url = window.URL.createObjectURL(new Blob([response.data.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', `${props.val.idStudent}`+"-fileBookBank.jpg"); //or any other extension
       document.body.appendChild(link);
       link.click();
    }); 
  }

  const bankData = () =>{
    if(props.role == 1){
      return(
        <div>
          <p>ชิ่อธนาคาร: {props.val.nameBank}     &emsp; เลขบัญชี: {props.val.idBank}</p>
          {/* <p>ชิ่อธนาคาร: {props.val.fileCardStudent}     &emsp; เลขบัญชี: {props.val.fileBookBank}</p> */}
            {props.val.fileCardStudent?<button class="btn btn-secondary" onClick={downloadCard} >ดาวน์โหลดไฟล์บัตรนิสิต </button>:<button class="btn btn-secondary"  disabled >ไม่มีไฟล์บัตรนิสิต </button>}
            &emsp;
            {props.val.fileBookBank?<button class="btn btn-secondary"  onClick={downloadBookBank} >ดาวน์โหลดไฟล์หน้าสมุดธนาคาร </button>:<button class="btn btn-secondary"  disabled >ไม่มีไฟล์หน้าสมุดธนาคาร </button>}
          
          {/* <Image src={require(`../backend/uploads/img/${props.val.fileCardStudent}`)} alt="fileCardStudent" width={220} height={220} />
          <Image src={require(`../backend/uploads/img/${props.val.fileBookBank}`)} alt="fileCardStudent" width={220} height={220} /> */}
        </div>
      )
    }
  }

  return (
    <div
      className="modal fade"
      id="ModalDetailNisit"
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
              #ข้อมูลนิสิต 
            </h5>
            
          </div>
          <div className="modal-body">
            <p>ชื่ออีเมลล์: {props.val.name_email}</p>
            <p>ชื่อ-สกุล: {props.val.name} {props.val.lastname} &emsp; รหัสนิสิต: {props.val.idStudent} </p>
            <p>ระดับ: {props.val.lvl} &emsp; ภาควิชา:{props.val.department}</p>
            <p>อีเมลล์: {props.val.email}     &emsp; เบอร์โทรศัพท์: {props.val.tel}</p>
            {bankData()}
            
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
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
