import React from "react";

export default function ModalCoursesSA(props) {

    const secNumber = () => {
        if (props.course.sec_P && props.course.sec_D) {
          const sec = props.course.sec_D + "," + props.course.sec_P +" (บรรยายและปฎิบัติ)";
          return sec;
        } else if (props.course.sec_P) return props.course.sec_P+" (ปฎิบัติ)";
        else if (props.course.sec_D) return props.course.sec_D+" (บรรยาย)";
    };

  return (
    <div
      className="modal fade"
      id="ModalCourseNisitSA"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" style={{ maxWidth: "70%" }}>
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "blue" }}>
            <h5
              className="modal-title"
              id="exampleModalLabel"
              style={{ color: "white" }}
            >
              #รายวิชาที่รับผิดชอบ
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
            <p>
              
              ชื่อวิชา: {props.course.title} &emsp; รหัสวิชา: {props.course.courseID} &emsp; หมู่เรียน: {secNumber()}
              
            </p>
            <p>จำนวนนิสิตที่ลงทะเบียนสำเร็จ: {props.users != null && props.users.length != 0 ? props.users.length : 0} คน</p>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th rowSpan="2">ลำดับ</th>
                  <th rowSpan="2">ชื่อ-สกุล</th>
                  <th rowSpan="2">รหัสนิสิต</th>
                  <th rowSpan="2">ระดับ</th>
                  <th rowSpan="2">สาขาวิชา</th>
                  <th rowSpan="2">อีเมลล์</th>
                  <th rowSpan="2">เบอร์โทรศัพท์</th>
                </tr>
              </thead>

              <tbody>
                {props.users.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td> {key+1} </td>
                      <td>{val.name} {val.lastname}</td>
                      <td>{val.idStudent}</td>
                      <td>{val.level}</td>
                      <td>{val.department}</td>
                      <td>{val.email}</td>
                      <td>{val.tel}</td>
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
