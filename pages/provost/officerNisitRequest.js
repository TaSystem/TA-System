import React, { useState, useEffect, useRef } from 'react';
import Axios from '../../config/Axios';
import SelectMajor from '../../components/SelectMajor';
import ModalCourse from '../../components/ModalCourse';
import ModalDetailNisit from '../../components/ModalDetailNisit';
import ModalDetailTeacher from '../../components/ModalDetailTeacher';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { connect } from 'react-redux';
import { getDetailNisit } from '../../redux/actions/nisitAction';
import { CSVLink } from 'react-csv';
import ReactToPrint from 'react-to-print';
const styles = {
  root: {
    padding: '100px',
    paddingTop: '0px',
    width: '297mm',
    height: '210mm',
    // border: '1px solid black',
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

const header2 = [
  { label: 'รหัสวิชา', key: 'รหัสวิชา', width: '120px' },
  { label: 'ชื่อวิชา', key: 'ชื่อวิชา', width: '500px' },
  { label: 'หมู่เรียน', key: 'หมู่เรียน', width: '50px' },
  {
    label: 'ชื่อ-สกุล อาจารย์ผู้สอน',
    key: 'ชื่อ-สกุล อาจารย์ผู้สอน',
    width: '500px',
  },
  { label: 'วัน ปฎิบัติงาน', key: 'วัน ปฎิบัติงาน', width: '100px' },
  { label: 'เวลา ปฎิบัติงาน', key: 'เวลา ปฎิบัติงาน', width: '100px' },
  {
    label: 'จำนวนนิสิตลงทะเบียน(คน)',
    key: 'จำนวนนิสิตลงทะเบียน(คน)',
    width: '100px',
  },
  {
    label: 'จำนวนนิสิตช่วยงาน(คน)',
    key: 'จำนวนนิสิตช่วยงาน(คน)',
    width: '100px',
  },
  {
    label: 'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)',
    key: 'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)',
    width: '100px',
  },
  {
    label: 'อัตราจ้างต่อชั่วโมง(บาท)',
    key: 'อัตราจ้างต่อชั่วโมง(บาท)',
    width: '100px',
  },
  {
    label: 'รวม15ครั้งเป็นเงิน(บาท)',
    key: 'รวม15ครั้งเป็นเงิน(บาท)',
    width: '100px',
  },
  { label: 'รหัสนิสิต', key: 'รหัสนิสิต', width: '100px' },
  { label: 'ชื่อ-สกุลนิสิต', key: 'ชื่อ-สกุลนิสิต', width: '100px' },
  { label: 'ธนาคาร', key: 'ธนาคาร', width: '100px' },
  { label: 'เลขบัญชี', key: 'เลขบัญชี', width: '100px' },
  { label: 'สาขา', key: 'สาขา', width: '100px' },
  { label: 'เบอร์โทรศัพท์', key: 'เบอร์โทรศัพท์', width: '100px' },
];

const header = [
  { label: 'รหัสวิชา', key: 'รหัสวิชา' },
  { label: 'ชื่อวิชา', key: 'ชื่อวิชา' },
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
  { label: 'รหัสนิสิต', key: 'รหัสนิสิต' },
  { label: 'ชื่อ-สกุลนิสิต', key: 'ชื่อ-สกุลนิสิต' },
  { label: 'ธนาคาร', key: 'ธนาคาร' },
  { label: 'เลขบัญชี', key: 'เลขบัญชี' },
  { label: 'สาขา', key: 'สาขา' },
  { label: 'เบอร์โทรศัพท์', key: 'เบอร์โทรศัพท์' },
];

const renderBody = (data) => {
  return data.map((item) => {
    console.log('item = ', item);
    return (
      <tr style={{ border: '1px solid black' }}>
        {header2.map((h, idx) => {
          let re = '';
          Object.keys(item).map((key, index) => {
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
            return <td style={styles.table}></td>;
          }
        })}
      </tr>
    );
  });
};

const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div style={styles.root} ref={ref}>
      <p style={{ ...styles.font }}>
        รายวิชาที่ขอนิสิตช่วยงาน ภาคปลาย ปีการศึกษา 2563
        <br />
        ภาควิชาวิศวกรรมคอมพิวเตอร์
        <br /> คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
      </p>

      <table style={{ ...styles.table, width: '100%' }}>
        <thead style={{ ...styles.table, height: '45px' }}>
          {header2.map((h) => (
            <th style={{ ...styles.table, width: h.width }}>
              <p style={styles.font}>{h.label}</p>
            </th>
          ))}
        </thead>
        <tbody style={styles.table}>{renderBody(props.data)}</tbody>
      </table>
    </div>
  );
});

function officerNisitRequest(props) {
  const [courses, setCourses] = useState([]);
  const [success, setSuccess] = useState(null);
  const [owner, setOwner] = useState([]);
  const [courseValue, setCourseValue] = useState([]);
  const [nisitValue, setNisitValue] = useState([]);
  const [session, loading] = useSession();
  const [search, setSearch] = useState(null);
  const [major, setMajor] = useState('All');
  const [yearNow, setYearNow] = useState([]);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    async function getCourses() {
      setLoad(true);
      const response = await Axios.get(`/courses/student-reply/2`);
      setCourses(response.data);
      setLoad(false);
    }
    async function getYear() {
      const response = await Axios.get('/setdate/getNow');
      setYearNow(response.data);
    }
    getYear();
    getCourses();
  }, [loading]);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
    }
  }, [loading]);
  function Filter(courses) {
    return courses.filter((course) => {
      if (major == 'All') {
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
      } else if (course.major == major) {
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
  const showModalCourse = (val) => {
    setCourseValue({
      CID: val.CID,
      title: val.title,
      courseID: val.courseID,
      sec_D: val.sec_D,
      sec_P: val.sec_P,
      day_D: val.day_D,
      day_P: val.day_P,
      start_D: val.start_D,
      start_P: val.start_P,
      end_D: val.end_D,
      end_P: val.end_P,
      number_D: val.number_D,
      number_P: val.number_P,
      numberReal: val.numberReal,
      level: val.level,
      major: val.major,
      teacher: val.teacher,
    });
  };
  const showModalNisit = (val) => {
    setNisitValue({
      CID: val.CID,
      email: val.email,
      name_email: val.name_email,
      name: val.name,
      lastname: val.lastname,
      idStudent: val.idStudent,
      lvl: val.lvl,
      department: val.department,
      roleTitle: val.roleTitle,
      tel: val.tel,
      nameBank: val.nameBank,
      idBank: val.idBank,
      fileCardStudent: val.fileCardStudent,
      fileBookBank: val.fileBookBank,
    });
  };

  const showModalCourseOwner = async (CID) => {
    const response = await Axios.get(`/users/course-owner/${CID}`);
    setOwner(response.data[0]);
    // setOwner({
    //   email:response.data[0].email,
    //   name_email:response.data[0].name_email,
    //   name:response.data[0].name,
    //   lastname:response.data[0].lastname,
    //   department:response.data[0].department,
    //   roleTitle:response.data[0].roleTitle,
    //   tel:response.data[0].tel,
    // });
  };

  const NisitapplyID = (id) => {
    let l = id.toString().length;
    if (l == 1) return 'SR00000' + id;
    else if (l == 2) return 'SR0000' + id;
    else if (l == 3) return 'SR000' + id;
    else if (l == 4) return 'SR00' + id;
    else if (l == 5) return 'SR0' + id;
    else if (l == 6) return 'SR' + id;
  };

  const replyTAsuccess = async (AID, CID, hrperweek, lvl) => {
    setError(null);
    setSuccess(null);
    //console.log("AID: ",AID);
    await Axios.put('/reply/student-reply', {
      email: session.user.email,
      studentapplyID: AID,
      status: 3,
      courseID: CID,
      hrperweek: hrperweek,
      lvl: lvl,
    }).then((response) => {
      if (response.data.check == 0) {
        setError(response.data.message);
      } else {
        setSuccess(response.data.message);
        setCourses(
          courses.filter((val) => {
            return val.AID !== AID;
          })
        );
      }
    });
  };

  const replyTAfail = async (AID, CID, title) => {
    let notereply = prompt('เหตุผลที่ยกนิสิต ' + title);
    if (notereply != null) {
      await Axios.put('/reply/student-reply', {
        email: session.user.email,
        studentapplyID: AID,
        status: 0,
        courseID: CID,
        notereply: notereply,
      }).then((response) => {
        setSuccess(response.data.message);
        setCourses(
          courses.filter((val) => {
            return val.AID !== AID;
          })
        );
      });
    } else {
      console.log('');
    }
  };

  if (typeof window !== 'undefined' && loading) return null;

  if (!session) {
    //console.log("in that case");
    return (
      <div>
        <h2>You aren't signed in, please sign in first</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>รายชื่อนิสิตที่ยื่นขอ(เจ้าหน้าที่)</h1>
      <div className="information">
        <h3>
          ปี{' '}
          {yearNow != null && yearNow.length != 0
            ? yearNow[0].year
            : 'loading...'}{' '}
          เทอม{' '}
          {yearNow != null && yearNow.length != 0
            ? yearNow[0].term
            : 'loading...'}
        </h3>
        <div
          className="input-group mb-3"
          style={{ maxHeight: '70vh', maxWidth: '75vw', marginTop: '1vh' }}
        >
          {/* {console.log('eiei')} */}
          <input
            type="text"
            className="form-control"
            placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
            onChange={(e) => setSearch(e.target.value)}
          />
          <SelectMajor
            onChange={async (e) => {
              setMajor(e.target.value);
              //console.log('major = ',e.target.value)
              const response = await Axios.get(
                `/document/getCSVApprove/${e.target.value}`
              );
              //console.log('data = ',response.data)
              setData(response.data);
            }}
          />
        </div>
        <div style={{ display: 'none' }}>
          <ComponentToPrint data={data} ref={componentRef} />
        </div>

        {/* <button type="submit" className="btn btn-success">
          พิมพ์เอกสารอนุมัติหลักการ
        </button> */}
        {/* {console.log('courses = ',courses)} */}
        {/* {console.log('Filter courses = ',Filter(courses))} */}
        {major !== 'All' ? (
          <ReactToPrint
            trigger={() => (
              <button type="submit" className="btn btn-danger">
                ดาวโหลดเอกสารอนุมัติหลักการ(PDF)
              </button>
            )}
            content={() => componentRef.current}
          />
        ) : (
          <button
            className="btn btn-danger"
            onClick={() => {
              alert('กรุณาเลือกสาขา');
            }}
          >
            ดาวโหลดข้อมูลเอกสารอนุมัติหลักการ(PDF){' '}
          </button>
        )}
        {major !== 'All' ? (
          <CSVLink
            filename={'เอกสารอนุมัติค่าใช้จ่าย.csv'}
            headers={header}
            data={data}
            disabled
            onClick={() => {
              console.log('');
            }}
            className="btn btn-success"
          >
            ดาวโหลดข้อมูลเอกสารอนุมัติหลักการ(EXCEL){' '}
          </CSVLink>
        ) : (
          <button
            className="btn btn-success"
            style={{ margin: '0 50px' }}
            onClick={() => {
              alert('กรุณาเลือกสาขา');
            }}
          >
            ดาวโหลดข้อมูลเอกสารอนุมัติหลักการ(EXCEL){' '}
          </button>
        )}

        <samll style={{ color: 'red' }}>
          <br />* 1.ยกเลิกคำขอของนิสิตที่ไม่ผ่านการเป็น SA ก่อน
          2.พิมพ์เอกสารตามภาควิชานั้นๆโดยการเลือก
          3.หลังพิมเอกสารยืนยันคำร้องนิสิตคนนั้นจะเป็น SA
        </samll>
        <p for="table" style={{ marginTop: '10px' }}>
          จำนวนคำร้อง:
          {courses != null && courses.length != 0 ? Filter(courses).length : 0}
        </p>
        {success && (
          <div className="alert alert-success" role="alert">
            {' '}
            {success}{' '}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {' '}
            {error}{' '}
          </div>
        )}
        <div
          className="table-responsive"
          style={{ maxHeight: '58vh', maxWidth: '75vw', marginTop: '1vh' }}
        >
          <table
            id="table"
            className="table table-hover table-bordered"
            cellspacing="0"
            style={{ textAlign: 'center' }}
          >
            <thead
              style={{
                position: 'sticky',
                top: 0,
                background: '#7a0117',
                color: '#fff',
                fontWeight: '400',
              }}
            >
              <tr>
                <th rowSpan="2">ลำดับ</th>
                <th rowSpan="2" class="text-nowrap">
                  รหัสคำขอ
                </th>
                <th rowSpan="2">รหัสวิชา</th>
                <th rowSpan="2">ชื่อวิชา</th>

                <th rowSpan="2">สาขาวิชา</th>
                <th rowSpan="2">อาจารย์</th>
                <th rowSpan="2" class="text-nowrap">
                  อาจารย์เจ้าของวิชา
                </th>
                <th rowSpan="2" class="text-nowrap">
                  ชื่อผู้ยื่น
                </th>
                <th rowSpan="2">เหตุผล</th>
                <th rowSpan="2">ตอบกลับคำร้อง</th>
              </tr>
            </thead>
            <tbody>
              {Filter(courses).map((val, key) => {
                return (
                  <tr>
                    <td>{key + 1}</td>
                    <td>{NisitapplyID(val.AID)}</td>
                    <td>
                      <Link href="#">
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#ModalCourse"
                          onClick={() => showModalCourse(val)}
                        >
                          {val.courseID}
                        </a>
                      </Link>
                    </td>
                    <td>{val.title}</td>

                    <td>{val.major}</td>
                    <td>{val.teacher}</td>
                    <td>
                      <td class="text-nowrap">
                        <Link href="#">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#ModalDetailTeacher"
                            onClick={() => showModalCourseOwner(val.CID)}
                          >
                            {val.ownerName} {val.ownerLastname}
                          </a>
                        </Link>
                      </td>
                    </td>
                    <td class="text-nowrap">
                      <Link href="#">
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#ModalDetailNisit"
                          onClick={() => showModalNisit(val)}
                        >
                          {val.name} {val.lastname}
                        </a>
                      </Link>
                    </td>
                    <td class="text-nowrap">{val.noteapply}</td>
                    <td class="text-nowrap">
                      <button
                        type="button"
                        class="btn btn-success"
                        key={key}
                        onClick={() => {
                          if (window.confirm('ต้องการยืนยันวิชา: ' + val.title))
                            replyTAsuccess(
                              val.AID,
                              val.CID,
                              val.hrperweek,
                              val.lvl
                            );
                        }}
                        style={{ width: '70px' }}
                      >
                        ยืนยัน
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        key={key}
                        onClick={() => {
                          replyTAfail(val.AID, val.CID, val.name);
                        }}
                        style={{ width: '70px', margin: '0 0 0 10px' }}
                      >
                        ยกเลิก
                      </button>
                    </td>
                  </tr>
                );
              })}
              {load && <h2 style={{ color: 'red' }}>กำลังโหลด...</h2>}
              {!load && courses && !courses.length && (
                <h2 style={{ color: 'red' }}>ไม่มีคำร้อง</h2>
              )}
            </tbody>
          </table>
        </div>
        <ModalCourse val={courseValue} />
        <ModalDetailNisit val={nisitValue} role={props.nisit.roleID} />
        <ModalDetailTeacher val={owner} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(officerNisitRequest);
