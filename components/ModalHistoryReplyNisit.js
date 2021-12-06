import React from "react";

export default function ModalHistoryReplyNisit(props) {
    const NisitapplyID = () =>{
        let l = props.AID.toString().length;
        if(l==1) return "SR00000"+props.AID;
        else if(l==2) return "SR0000"+props.AID;
        else if(l==3) return "SR000"+props.AID;
        else if(l==4) return "SR00"+props.AID;
        else if(l==5) return "SR0"+props.AID;
        else if(l==6) return "SR"+props.AID;
      }
      const condition = (status) => {
        if (status === 1) {
          return (
            <>
              <p
                class="text-nowrap"
                style={{
                  backgroundColor: "#E3E726",
                  color: "white",
                  borderRadius: "6px",
                  padding: "3px",
                }}
              >
                อาจารย์ยืนยัน
              </p>
            </>
          );
        } else if (status === 2) {
          return (
            <>
              <p
                class="text-nowrap"
                style={{
                  backgroundColor: "#E3E726",
                  color: "white",
                  borderRadius: "6px",
                  padding: "3px",
                }}
              >
                อาจารย์ยืนยัน
              </p>
            </>
          );
        } else if (status === 3) {
          return (
            <>
              <p
                class="text-nowrap"
                style={{
                  backgroundColor: "#32CD32",
                  color: "white",
                  borderRadius: "6px",
                  padding: "3px",
                }}
              >
                เจ้าหน้าที่ยืนยัน
              </p>
            </>
          );
        } else {
          return (
            <>
              <p
                class="text-nowrap"
                style={{
                  backgroundColor: "#DD0E0E",
                  color: "white",
                  borderRadius: "6px",
                  padding: "3px",
                }}
              >
                ถูกยกเลิก
              </p>{" "}
            </>
          );
        }
      };

  return (
    <div
      className="modal fade"
      id="ModalHistoryReply"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "50%" }}
      >
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#7a0117" }}>
            <h5
              className="modal-title"
              id="exampleModalLabel"
              style={{ color: "white" }}
            >
              #ประวัติการอนุมัติ
            </h5>
          </div>
          <div className="modal-body">
            <p>รหัสคำขอ: {NisitapplyID()} </p>
            <table className="table table-hover table-bordered" cellspacing="0" style={{textAlign:"center"}}>
              <thead style={{position:"sticky",top:0,background:"#7a0117",color:"#fff",fontWeight:"400"}}>
                <tr>
                  <th rowSpan="2">ขั้นตอน</th>

                  <th colSpan="4">ข้อมูลผู้กดยืนยัน</th>
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
                      <td>{condition(val.status)}</td>

                      <td>
                        {val.name} {val.lastname}
                      </td>
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
