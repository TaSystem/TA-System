import React from "react";

export default function ModalCoursesSA(props) {
  const secNumber = () => {
    if (props.course.sec_P && props.course.sec_D) {
      const sec =
        props.course.sec_D + "," + props.course.sec_P + " (บรรยายและปฎิบัติ)";
      return sec;
    } else if (props.course.sec_P) return props.course.sec_P + " (ปฎิบัติ)";
    else if (props.course.sec_D) return props.course.sec_D + " (บรรยาย)";
  };

  return (
    <div
      className="modal fade"
      id="ModalCourseNisitSA"
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
              ชื่อวิชา: {props.course.title} &emsp; รหัสวิชา:{" "}
              {props.course.courseID} &emsp; หมู่เรียน: {secNumber()}
            </p>
            <p>
              จำนวนนิสิตที่ลงทะเบียนสำเร็จ:{" "}
              {props.users != null && props.users.length != 0
                ? props.users.length
                : 0}{" "}
              คน
            </p>
            <table
              className="table table-bordered table-striped"
              cellspacing="0"
              style={{ textAlign: "center" }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#7a0117",
                  color: "#fff",
                  fontWeight: "400",
                }}
              >
                <tr>
                  <th rowSpan="2">ลำดับ</th>
                  <th rowSpan="2">ชื่อ-สกุล</th>
                  <th rowSpan="2">รหัสนิสิต</th>
                  <th rowSpan="2">ระดับ</th>
                  <th rowSpan="2">สาขาวิชา</th>
                  <th rowSpan="2">อีเมลล์</th>
                  <th rowSpan="2">เบอร์โทรศัพท์</th>
                  <th rowSpan="2">ปริ้นใบเช็คชื่อ</th>
                </tr>
              </thead>

              <tbody>
                {props.users.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td> {key + 1} </td>
                      <td>
                        {val.name} {val.lastname}
                      </td>
                      <td>{val.idStudent}</td>
                      <td>{val.level}</td>
                      <td>{val.department}</td>
                      <td>{val.email}</td>
                      <td>{val.tel}</td>
                      <td>
                        <button type="button" class="btn btn-secondary">
                          ปริ้นใบเช็คชื่อ
                        </button>
                      </td>
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
