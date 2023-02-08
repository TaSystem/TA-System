import React from "react";
import styles from "./form.style.module.css";
const ApplicationNisitSA = ((props, ref) => {
  console.log('props123 = ', props)
  const {
    name = "",
    idStudent = "",
    departmentNisit = "",
    year = "",
    term = "",
    department = "",
    nisitYear = '',
    tel = "",
    bank = "",
    accountNumber = "",
    tableDatas = []
  } = props;
  const header = [
    { text: "ลำดับที่", key: "number" },
    { text: "รหัสวิชา", key: "courseId" },
    { text: "ชื่อวิชา", key: "subjectName" },
    { text: "หมู่เรียน", key: "sec" },
    { text: "วันที่ปฎิบัติงาน/n(จันทร์ - อาทิตย์)", key: "day" },
    { text: "เวลาที่ปฎิบัติงาน", key: "time" },
    { text: "จำนวนชั่วโมงที่/nปฎิบัติงาน/สัปดาห์", key: "hrperweek" }
  ];
  const item = {
    number: "",
    courseId: "",
    subjectName: "",
    sec: "",
    day: "",
    time: "",
    hrperweek: ""
  };
  const data = new Array(5).fill(1).map((i) => item);
  return (
    <div
      style={{
        width: "297mm",
        height: "210mm",
        // border: "1px solid black",
        padding: "28px",
        display: "flex",
        flexDirection: "column"
        // justifyContent: "space-between"
      }}
      ref={ref}
    >
      {" "}
      <div>
        <p className={styles.headerText}>
          {`ใบสมัครนิสิตช่วยงานปฎิบัติงาน ภาควิชา${department}`}
        </p>
        <p className={styles.headerText}>{`ประจำภาค${term} ปีการศึกษา ${year}`}</p>
        <p className={styles.headerText}>
          คณะวิศกรรมศาสตร์ศรีราชา มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
        </p>
      </div>
      <div style={{ marginTop: "10px" }}>
        <p className={styles.bodyText}>
          {`ชื่อ -
          นามสกุล.............${name}...................................................................
          รหัสประจำตัวนิสิต
          ..........${idStudent}................................`}
        </p>
        <p className={styles.bodyText}>
          {/* departmentNisit */}
          {`ภาควิชา.......................${departmentNisit}..........................................................................
          ชั้นปี
          ......${nisitYear}..........................`}
        </p>
        <p className={styles.bodyText}>
          {` เบอร์โทรศัพท์.........${tel}..............................................
          ธนาคาร ............${bank}................ เลขบัญชี
          .......${accountNumber}...................................`}
        </p>
      </div>
      <table className={styles.tableConatiner}>
        <tr className={styles.borderTable}>
          {header.map((h, index) => (
            <th className={styles.headerCell} key={index}>
              {h.text.split("/n").map((t, index) => (
                <p className={styles.headerTd} key={index}>{t}</p>
              ))}
            </th>
          ))}
        </tr>


        {tableDatas?.map((d,index) => (
          // arr[0] = key
          // arr[1] = val
          <tr className={styles.trStyle} key={index}>
            {Object.entries(d).map((arr, idx) => (
              <td className={styles.bodyCell} key={idx}><p style={{ textAlign: 'center' }}>{arr[1]}</p></td>
            ))}
          </tr>
        ))}
      </table>
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
          <p style={{ fontWeight: "bold" }}>
            <span style={{ textDecoration: "underline", lineHeight: 'a' }}>
              เอกสารแนบพร้อมกับใบสมัคร
            </span>{" "}
            (เอกสาร 1 ชุด/คน)
          </p>
          <p className={styles.bodyText}>
            1. สำเนาบัตนิสิตที่ยังไม่หมดอายุ พร้อมเซ็นรับรองสำเนาถูกต้อง
          </p>
          <p className={styles.bodyText}>
            2. สำเนาบัญชีธนาคาร หน้าที่มีชื่อและเลขที่บัญชีของผู้ปฎิบัติงาน
          </p>
          <div style={{ display: "flex", marginTop: "auto" }}>
            <p
              className={styles.bodyText}
              style={{
                display: "inline",
                fontWeight: "bold",
                lineHeight: "18px"
              }}
            >
              หมายเหตุ :
            </p>
            <ul
              style={{
                display: "inline-block",
                listStyleType: "none",
                marginLeft: "2px"
              }}
            >
              <li>นิสิตระดับปริญญาตรี อัตราค่าจ้างชั่วโมงละ 30 บาท</li>
              <li style={{ marginTop: "15px" }}>
                นิสิตระดับปริญญาโท อัตราค่าจ้างชั่วโมงละ 40 บาท
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomRight}>
          <p>
            ลงชื่อผู้สมัคร............................................................................................
          </p>
        </div>
      </div>
    </div>
  );
})

export default React.forwardRef(ApplicationNisitSA);
