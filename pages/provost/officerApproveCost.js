import Axios from "../../config/Axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import SelectMajor from "../../components/SelectMajor";
import Link from "next/link";
import ModalCourse from "../../components/ModalCourse";
import ModalDetailTeacher from "../../components/ModalDetailTeacher";
import ModalHistoryReply from "../../components/ModalHistoryReply";
import { CSVLink } from 'react-csv';
import ReactToPrint from 'react-to-print';


function officerApproveCost(props) {
  const componentRef = React.useRef();
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [success, setSuccess] = useState(null);
  const [major, setMajor] = useState("All");
  const [numberReal, setNumberReal] = useState({});
  const [applyID,setApplyID] = useState([]);
  const [historyReply,setHistoryReply] = useState([]);
  const [courseValue,setCourseValue] = useState([]);
  const [teacherValue,setTeacherValue] = useState([]);
  const [data,setData] = useState([]);



  const [session, loading] = useSession();
  

  
  useEffect(() => {
    async function getCourses() {
      const response = await Axios.get(`/courses/teacher-reply/${4}`);
      setCourseList(response.data);
    }
    getCourses();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

  function Filter(courses) {
    return courses.filter((course) => {
      if (major == "All") {
        if (!search) {
          return course;
        } else if (course.title.toLowerCase().includes(search.toLowerCase())) {
          return course;
        } else if (
          course.courseID.toLowerCase().includes(search.toLowerCase())
        ) {
          return course;
        } else if (
          course.teacher.toLowerCase().includes(search.toLowerCase())
        ) {
          return course;
        }
      }
      else if (course.major == major) {
        if (!search) {
          return course;
        } else if (course.title.toLowerCase().includes(search.toLowerCase())) {
          return course;
        } else if (
          course.courseID.toLowerCase().includes(search.toLowerCase())
        ) {
          return course;
        } else if (
          course.teacher.toLowerCase().includes(search.toLowerCase())
        ) {
          return course;
        }
      }
    });
  }

  const TeacherapplyID = (id) =>{
    let l = id.toString().length;
    if(l==1) return "TR00000"+id;
    else if(l==2) return "TR0000"+id;
    else if(l==3) return "TR000"+id;
    else if(l==4) return "TR00"+id;
    else if(l==5) return "TR0"+id;
    else if(l==6) return "TR"+id;
}


  async function CheckCourseCondition(course,AID) {
    await Axios.put("/reply/check-course-condition", {
      email:session.user.email,
      applyTaId:AID,
      status: 5,
    }).then((response) => {
      setSuccess(response.data.message);
      setCourseList(
        courseList.filter((val) => {
          return val.AID !== AID;
        })
      );
    });
  }
  async function replyTAfail(course,AID,title) {
    let notereply = prompt("เหตุผลที่ยกเลิกวิชา "+title);
    if(notereply != null){
      await Axios.put("/reply/teacher-reply", {
        email:session.user.email,
        applyTaId:AID,
        courseID: course,
        status: 0,
        notereply:notereply
      }).then((response) => {
        setSuccess(response.data.message);
        setCourseList(
          courseList.filter((val) => {
            return val.AID !== AID;
          })
        );
      });
    }
    else{
      console.log("cancle")
    }
  }

  const updateNumberReal = async (id) => {
    await Axios.put("/courses/updateNumber", {
      id: id,
      numberReal: numberReal[id],
    }).then((response) => {
      setCourseList(response.data);
    });
  };

  const showModalHistory = async (id) =>{
    const response = await Axios.get(`/historyreply/${id}`);
    setHistoryReply(response.data);
    setApplyID(id);
  }
  const showModalCourse =  (val) =>{
    setCourseValue({
      CID:val.CID,
      title:val.title,
      courseID:val.courseID,
      sec_D:val.sec_D,
      sec_P:val.sec_P,
      day_D:val.day_D,
      day_P:val.day_P,
      start_D:val.start_D,
      start_P:val.start_P,
      end_D:val.end_D,
      end_P:val.end_P,
      number_D:val.number_D,
      number_D:val.number_P,
      level:val.level,
      major:val.major,
      teacher:val.teacher
      
    });
  }
  const showModalTeacher =  (val) =>{
    setTeacherValue({
      CID:val.CID,
      email:val.email,
      name_email:val.name_email,
      name:val.name,
      lastname:val.lastname,
      department:val.department,
      roleTitle:val.roleTitle,
      tel:val.tel,
    });
    
  }
  
  // const downloadExcel = async () =>{
  //   const response = await Axios.get(`/document/getCSV/`,{
  //     major :major
  //   });
  //   console.log('resdata = ',response.data)
    
  // }
  // ------------------------------------------------------------ print document ----------------------------------------------
  const header = [
    { label: 'รหัสวิชา', key: 'รหัสวิชา' },
    { label: 'ชื่อวิชา', key: 'ชื่อวิชา' },
    { label: 'หมู่เรียน', key: 'หมู่เรียน' },
    { label: 'ชื่อ-สกุล อาจารย์ผู้สอน', key: 'ชื่อ-สกุล อาจารย์ผู้สอน' },
    { label: 'วัน ปฎิบัติงาน', key: 'วัน ปฎิบัติงาน' },
    { label: 'เวลา ปฎิบัติงาน', key: 'เวลา ปฎิบัติงาน' },
    { label: 'จำนวนนิสิตลงทะเบียน(คน)', key: 'จำนวนนิสิตลงทะเบียน(คน)' },
    { label: 'จำนวนนิสิตช่วยงาน(คน)', key: 'จำนวนนิสิตช่วยงาน(คน)' },
    {
      label: 'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)',
      key: 'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)',
    },
    { label: 'อัตราจ้างต่อชั่วโมง(บาท)', key: 'อัตราจ้างต่อชั่วโมง(บาท)' },
    { label: 'รวม15ครั้งเป็นเงิน(บาท)', key: 'รวม15ครั้งเป็นเงิน(บาท)' },
  ];

  const renderBody = () => {
    return data.map((item) => {
      console.log('item = ', item);
      return (
        <tr>
          {header.map((h) => {
            let re = '';
            Object.keys(item).map((key) => {
              if (h.key === key) {
                re = (
                  <td style={styles.table}>
                    <p style={styles.font}>{item[key]}</p>
                  </td>
                );
              }
            });
            if (re) {
              return re;
            } else {
              return <td></td>;
            }
          })}
        </tr>
      );
    });
  };
  const styles = {
    root: {
      padding: '100px',
      paddingTop: '50px',
      width: '100%',
      height: '100%',
      display:'flex',
      flexDirection:'column',
      height:'initial',
      overflow:'initial'
      // justifyContent:'center',
      // display:'none'
    },
    font: {
      fontSize: '10px',
      textAlign: 'center',
      fontFamily: 'Sarabun',
      lineHeight: '20px',
    },
    table: {
      border: '1px solid black',
      borderCollapse: 'collapse',
    },
  };

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div>
        <div style = {{height: "90vh", padding: "5vh",
        
        // background:'red'
        
        }}>
        <div style={styles.root}>
          <p style={{ ...styles.font, fontWeight: 'Bold' }}>
            รายวิชาที่ขอนิสิตช่วยงาน ภาคปลาย ปีการศึกษา 2563
          </p>
          <p style={{ ...styles.font, fontWeight: 'Bold' }}>
            ภาควิชาวิศวกรรมคอมพิวเตอร์
          </p>
          <p style={{ ...styles.font, fontWeight: 'Bold' }}>
            คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
          </p>
          <table style={styles.table}>
            <thead style={{ height: '45px' }}>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>รหัสวิชา</p>
              </th>
              <th style={{ ...styles.table, width: '300px' }}>
                <p style={styles.font}>ชื่อวิชา</p>
              </th>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>หมู่เรียน</p>
              </th>
              <th style={{ ...styles.table, width: '200px' }}>
                <p style={styles.font}>ชื่อ-สกุล อาจารย์ผู้สอน</p>
              </th>
              <th style={{ width: '100px' }}>
                <p style={{ ...styles.font, textAlign: 'end' }}>วัน-เวลา</p>
              </th>
              <th style={{ width: '100px' }}>
                <p style={{ ...styles.font, textAlign: 'start' }}>ปฎิบัติงาน</p>
              </th>
              <th style={{ ...styles.table, width: '65px' }}>
                <p style={styles.font}>จำนวนนิสิตลงทะเบียน (คน)</p>
              </th>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>
                  จำนวนนิสิต
                  <br />
                  ช่วยงาน
                  <br />
                  (คน)
                </p>
              </th>
              <th style={{ ...styles.table, width: '130px' }}>
                <p style={styles.font}>
                  จำนวนชั่วโมง <br />
                  การทำงาน
                  <br /> (ชั่วโมง/คน/สัปดาห์)
                </p>
              </th>
              <th style={{ ...styles.table, width: '75px' }}>
                <p style={styles.font}>
                  อัตราจ้าง
                  <br />
                  ต่อชั่วโมง
                  <br /> (บาท)
                </p>
              </th>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>
                  รวม15ครั้ง
                  <br />
                  เป็นเงิน(บาท)
                </p>
              </th>
            </thead>
            <tbody style={styles.table}>{renderBody()}</tbody>
          </table>
        </div>
        </div>
        {/* item2 */}
        {/* <div style = {{height: "90vh", padding: "5vh"}}>
        <div style={styles.root}>
          <p style={{ ...styles.font, fontWeight: 'Bold' }}>
            รายวิชาที่ขอนิสิตช่วยงาน ภาคปลาย ปีการศึกษา 2563
          </p>
          <p style={{ ...styles.font, fontWeight: 'Bold' }}>
            ภาควิชาวิศวกรรมคอมพิวเตอร์
          </p>
          <p style={{ ...styles.font, fontWeight: 'Bold' }}>
            คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
          </p>
          <table style={styles.table}>
            <thead style={{ height: '45px' }}>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>รหัสวิชา</p>
              </th>
              <th style={{ ...styles.table, width: '300px' }}>
                <p style={styles.font}>ชื่อวิชา</p>
              </th>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>หมู่เรียน</p>
              </th>
              <th style={{ ...styles.table, width: '200px' }}>
                <p style={styles.font}>ชื่อ-สกุล อาจารย์ผู้สอน</p>
              </th>
              <th style={{ width: '100px' }}>
                <p style={{ ...styles.font, textAlign: 'end' }}>วัน-เวลา</p>
              </th>
              <th style={{ width: '100px' }}>
                <p style={{ ...styles.font, textAlign: 'start' }}>ปฎิบัติงาน</p>
              </th>
              <th style={{ ...styles.table, width: '65px' }}>
                <p style={styles.font}>จำนวนนิสิตลงทะเบียน (คน)</p>
              </th>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>
                  จำนวนนิสิต
                  <br />
                  ช่วยงาน
                  <br />
                  (คน)
                </p>
              </th>
              <th style={{ ...styles.table, width: '130px' }}>
                <p style={styles.font}>
                  จำนวนชั่วโมง <br />
                  การทำงาน
                  <br /> (ชั่วโมง/คน/สัปดาห์)
                </p>
              </th>
              <th style={{ ...styles.table, width: '75px' }}>
                <p style={styles.font}>
                  อัตราจ้าง
                  <br />
                  ต่อชั่วโมง
                  <br /> (บาท)
                </p>
              </th>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>
                  รวม15ครั้ง
                  <br />
                  เป็นเงิน(บาท)
                </p>
              </th>
            </thead>
            <tbody style={styles.table}>{renderBody()}</tbody>
          </table>
        </div> */}
        </div>
        
      );
    }
  }


  // ------------------------------------------------------------ print document ----------------------------------------------
  //จำนวนที่ลงใส่หน้านี้

  return (
    <div className="container">
      <h1>จัดทำเอกสารอนุมัติค่าใช้จ่าย (เจ้าหน้าที่)</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
          onChange={(e) => setSearch(e.target.value)}
        />
        <SelectMajor onChange={async (e) => {
            setMajor(e.target.value);
            console.log('major = ',e.target.value)
            const response = await Axios.get(`/document/getCSV/${e.target.value}`);
            setData(response.data)
            console.log('resdata = ',response.data)
          }}/>
          </div>
          <ReactToPrint
        trigger={() => <button type="submit" className="btn btn-danger">
        ดาวโหลดสารอนุมัติค่าใช้จ่าย(PDF)
      </button>}
        content={() => componentRef.current}
      />
        
        <div style={{ display: 'none' }}>
        <ComponentToPrint ref={componentRef} />
        </div>
        {/* <br/> */}
        <CSVLink filename = {'เอกสารอนุมัติค่าใช้จ่าย.csv'} headers = {header} data ={data} className="btn btn-success">ดาวโหลดข้อมูลเอกสารค่าใช้จ่าย(EXCEL) </CSVLink>
        
        <p style={{color:"red"}} > *1.ยกเลิกคนที่ไม่ต้องการ 2.ปริ้นเอกสารอนุมัติค่าใช้จ่าย 3.กรอกจำนวนที่ลง 4.กดตรวจสอบ </p>
        {/* <button type="submit" className="btn btn-success">
          ตรวจสอบทั้งหมด
        </button> */}
      <div className="information">
      {success && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success}{" "}
            </div>
      )}
        จำนวนคำร้อง: {courseList != null && courseList.length != 0 ? courseList.length : 0}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">รหัสคำขอ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>
              <th colSpan="2">หมู่เรียน</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">จำนวนที่รับ</th>
              <th rowSpan="2">จำนวนที่ลง</th>
              <th rowSpan="2">กรอกจำนวนที่ลง</th>
              <th rowSpan="2">อาจารย์ผู้สอน</th>
              <th rowSpan="2">อาจารย์ผู้ขอ</th>
              <th colSpan="2">จำนวนที่ขอ</th>
              <th rowSpan="2">จำนวนชั่วโมง/สัปดาห์</th>
              <th rowSpan="2">ค่าใช้จ่าย</th>
              <th rowSpan="2">ตอบกลับ</th>
            </tr>
            <tr>
              <th>บรรยาย</th>
              <th>ปฎิบัติ</th>
              <th>ป.ตรี</th>
              <th>ป.โท</th>
            </tr>
          </thead>
          <tbody>
            {Filter(courseList).map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    <Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalHistoryReply" onClick={()=>showModalHistory(val.AID)} >
                        {TeacherapplyID(val.AID)}
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalCourse"  onClick={()=>showModalCourse(val)}>
                        {val.courseID}
                      </a>
                    </Link>
                  </td>
                  <td>{val.title}</td>
                  <td>{val.sec_D ? val.sec_D : "-"}</td>
                  <td>{val.sec_P ? val.sec_P : "-"}</td>
                  <td>{val.major}</td>
                  <td>{val.number_D ? val.number_D : val.number_P}</td>
                  <td>{val.numberReal ? val.numberReal : "ยังไม่กรอก"}</td>
                  <td>
                    <input
                      key={key}
                      className="form-control"
                      type="text"
                      placeholder="จำนวนนิสิต"
                      value={numberReal[val.CID]}
                      onChange={(e) => {
                        setNumberReal((p) => {
                          let x = p;
                          x[val.CID] = e.target.value;
                          return x;
                        });
                      }}
                    />
                    <button
                    key={key}
                      type="button"
                      className="btn btn-success"
                      onClick={() => updateNumberReal(val.CID)}
                    >
                      ยืนยัน
                    </button>
                  </td>
                  <td>{val.teacher}</td>
                  <td>
                    <Link href="#">
                      <a  data-bs-toggle="modal" data-bs-target="#ModalDetailTeacher"  onClick={()=>showModalTeacher(val)}>
                        {val.name_email}
                      </a>
                    </Link>
                  </td>
                  <td>{val.number1}</td>
                  <td>{val.number2}</td>
                  {val.sec_D && val.sec_P && <td>5</td>}
                  {val.sec_D && !val.sec_P && <td>2</td>}
                  {!val.sec_D && val.sec_P && <td>3</td>}
                  {val.sec_D && val.sec_P && (
                    <td>
                      {val.number1 * 5 * 30 * 15 + val.number2 * 5 * 40 * 15}
                    </td>
                  )}
                  {val.sec_D && !val.sec_P && (
                    <td>
                      {val.number1 * 2 * 30 * 15 + val.number2 * 2 * 40 * 15}
                    </td>
                  )}
                  {!val.sec_D && val.sec_P && (
                    <td>
                      {val.number1 * 3 * 30 * 15 + val.number2 * 3 * 40 * 15}
                    </td>
                  )}
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        if (window.confirm("ต้องการยืนยันวิชา: " + val.title))
                          CheckCourseCondition(val.CID,val.AID);
                      }}
                    >
                      ตรวจสอบ
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>  replyTAfail(val.CID,val.AID,val.title) }
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ModalCourse val={courseValue} />
        <ModalDetailTeacher val={teacherValue}  />
        <ModalHistoryReply AID={applyID} history={historyReply}  />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(officerApproveCost);


