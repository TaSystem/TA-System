import React from "react";

export default function ModalDetailTeacher(props) {
 
  const applyID = () =>{
      let l = props.AID.toString().length;
      if(l==1) return "TR00000"+props.AID;
      else if(l==2) return "TR0000"+props.AID;
      else if(l==3) return "TR000"+props.AID;
      else if(l==4) return "TR00"+props.AID;
      else if(l==5) return "TR0"+props.AID;
      else if(l==6) return "TR"+props.AID;
  }

  return (
    <div
      className="modal fade"
      id="ModalHistoryReply"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"

    >
      <div className="modal-dialog" style={{maxWidth:"50%"}}>
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "blue" }}>
            <h5
              className="modal-title"
              id="exampleModalLabel"
              style={{ color: "white" }}
            >
              #ประวัติการอนุมัติ
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
            <p>รหัสคำขอ:  {applyID()}    </p>
            <table className="table table-bordered">
          <thead>
            <tr>
              
              <th rowSpan="2">ขั้นตอน</th>
              
              <th colSpan="4">ข้อมูลผู้ขอ</th>
              
            </tr>
            <tr>
              <th>ชื่อ-สกุล</th>
              <th>อีเมลล์</th>
              <th>เบอร์โทร</th>
              <th>ตำแหน่ง</th>
              
            </tr>
          </thead>
          <tbody>
          {props.history.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.status}</td>
                  
                  <td>{val.name} {val.lastname}</td>
                  <td>{val.email}</td>
                  <td>{val.tel}</td>
                  <td>{val.title}</td>
                  
                  
                  
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
