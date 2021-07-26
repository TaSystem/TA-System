import React , {useState , useEffect} from 'react'
import Axios from "../../config/Axios";

export default function index() {
 
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      async function getCourses(){
          const response = await Axios.get("/courses");
          setCourses(response.data)
      }
      getCourses(); 
    },[]);
  
    return (
      <div className="container">
        <h1>รายวิชาของเจ้าหน้าที่</h1>
        <div className="information">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th rowSpan="2">ลำดับ</th>
                <th rowSpan="2">รหัสวิชา</th>
                <th rowSpan="2">รหัสวิชา-พ.ศ.หลักสูตร</th>
                <th rowSpan="2">ชื่อวิชา</th>
                <th colSpan="11">บรรยาย</th>
                <th colSpan="10">ปฎิบัติ</th>
                <th rowSpan="2">อาจารย์</th>
                <th rowSpan="2">วิชาพื้นฐาน</th>
                <th rowSpan="2">จำนวนชั่วโมงที่จัดสอบ</th>
                <th colSpan="2">บรรยาย</th>
                <th colSpan="2">ปฎิบัติ</th>
                <th rowSpan="2">หมายเหตุ</th>
                <th rowSpan="2">สาขา</th>
              </tr>
              <tr>
                <th>หน่วยกิต</th>
                <th>หน่วย</th>
                <th>จำนวนชม.</th>
                <th>หมู่</th>
                <th>วัน</th>
                <th>เริ่ม</th>
                <th>-</th>
                <th>สิ้นสุด</th>
                <th>ห้อง</th>
                <th>สาขา</th>
                <th>จำนวน</th>
  
                <th>หน่วย</th>
                <th>จำนวนชม.</th>
                <th>หมู่</th>
                <th>วัน</th>
                <th>เริ่ม</th>
                <th>-</th>
                <th>สิ้นสุด</th>
                <th>ห้อง</th>
                <th>สาขา</th>
                <th>จำนวน</th>
                <th>ส่วนกลางจัดสอบ</th>
                <th>จัดสอบเองนอกตาราง</th>
                <th>ส่วนกลางจัดสอบ</th>
                <th>จัดสอบเองนอกตาราง</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key+1}</td>
                    <td>{val.courseID}</td>
                    <td>{val.courseYear}</td>
                    <td>{val.title}</td>
                    <td>{val.credit}</td>
                    <td>{val.unit_D}</td>
                    <td>{val.hr_D}</td>
                    <td>{val.sec_D}</td>
                    <td>{val.day_D}</td>
                    <td>{val.start_D}</td>
                    <td>{val.dat1}</td>
                    <td>{val.end_D}</td>
                    <td>{val.room_D}</td>
                    <td>{val.major_D}</td>
                    <td>{val.number_D}</td>
  
                    <td>{val.unit_P}</td>
                    <td>{val.hr_P}</td>
                    <td>{val.sec_P}</td>
                    <td>{val.day_P}</td>
                    <td>{val.start_P}</td>
                    <td>{val.dat2}</td>
                    <td>{val.end_P}</td>
                    <td>{val.room_P}</td>
                    <td>{val.major_P}</td>
                    <td>{val.number_P}</td>
                    <td>{val.teacher}</td>
                    <td>{val.subjectBefore}</td>
                    <td>{val.testTime}</td>
                    <td>{val.central_M}</td>
                    <td>{val.decentral_M}</td>
                    <td>{val.central_F}</td>
                    <td>{val.decentral_F}</td>
                    <td>{val.note}</td>
                    <td>{val.major}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
