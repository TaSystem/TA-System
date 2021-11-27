import React from "react";

export default function ModalDetailTeacher(props) {
  const applyID = () => {
    let l = props.AID.toString().length;
    if (l == 1) return "TR00000" + props.AID;
    else if (l == 2) return "TR0000" + props.AID;
    else if (l == 3) return "TR000" + props.AID;
    else if (l == 4) return "TR00" + props.AID;
    else if (l == 5) return "TR0" + props.AID;
    else if (l == 6) return "TR" + props.AID;
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
            <p>รหัสคำขอ: {applyID()} </p>
            <table className="table table-bordered" cellspacing="0" style={{textAlign:"center"}}>
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
                      <td>{val.status}</td>

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
