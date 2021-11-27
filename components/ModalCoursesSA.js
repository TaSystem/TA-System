import React from "react";

export default function ModalCoursesSA(props) {
  return (
    <div
      className="modal fade"
      id="ModalCoursesSA"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "70%" }}
      >
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#7a0117" }}>
            <h5
              className="modal-title"
              id="exampleModalLabel"
              style={{ color: "white" }}
            >
              #รายวิชาที่รับผิดชอบ
            </h5>
          </div>
          <div className="modal-body">
            <p>
              {" "}
              ชื่อ-นามสกุล: {props.user.name} {props.user.lastname} &emsp;
              เวลาทำงานรวม: {props.user.workHour} ชั่วโมง &emsp; ปีการศึกษา{" "}
              {props.user.year} &emsp; เทอมการศึกษา {props.user.term}
            </p>
            <table className="table table-hover table-bordered" cellspacing="0" style={{textAlign:"center"}}>
              <thead style={{position:"sticky",top:0,background:"#7a0117",color:"#fff",fontWeight:"400"}}>
                <tr>
                  <th rowSpan="2">ลำดับ</th>
                  <th rowSpan="2">รหัสวิชา</th>
                  <th rowSpan="2">ชื่อวิชา</th>
                  <th colSpan="2">หมู่เรียน</th>
                  <th colSpan="2">เวลาเรียน</th>
                  <th rowSpan="2">สาขาวิชา</th>
                  <th rowSpan="2">อาจารย์ผู้สอน</th>
                  <th rowSpan="2">เวลาทำงาน</th>
                </tr>
                <tr>
                  <th>บรรยาย</th>
                  <th>ปฎิบัติ</th>

                  <th>บรรยาย</th>
                  <th>ปฎิบัติ</th>
                </tr>
              </thead>

              <tbody>
                {props.courses.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{val.courseID}</td>
                      <td>{val.title}</td>
                      <td>{val.sec_D ? val.sec_D : "-"}</td>
                      <td>{val.sec_P ? val.sec_P : "-"}</td>
                      <td>
                        {val.day_D
                          ? val.day_D + " " + val.start_D + "-" + val.end_D
                          : "-"}{" "}
                      </td>
                      <td>
                        {val.day_P
                          ? val.day_P + " " + val.start_P + "-" + val.end_P
                          : "-"}{" "}
                      </td>
                      <td>{val.major}</td>
                      <td>{val.teacher}</td>
                      <td>{val.hrperweek} ชั่วโมง</td>
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
