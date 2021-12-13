import React, { useState, useEffect } from 'react';
import Axios from '../../config/Axios';
import ModalCourse from '../../components/ModalCourse';
import ModalDetailNisit from '../../components/ModalDetailNisit';
import ModalDetailTeacher from '../../components/ModalDetailTeacher';
import SelectMajor from '../../components/SelectMajor';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { connect } from 'react-redux';
import { getDetailNisit } from '../../redux/actions/nisitAction';

function provostNisitRequest(props) {
  const [courses, setCourses] = useState([]);
  const [owner, setOwner] = useState([]);
  const [success, setSuccess] = useState(null);
  const [courseValue, setCourseValue] = useState([]);
  const [nisitValue, setNisitValue] = useState([]);
  const [yearNow, setYearNow] = useState([]);
  const [search, setSearch] = useState(null);
  const [major, setMajor] = useState('All');
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
      async function getCourses() {
        setLoad(true);
        await Axios.post('/users/profiledetail', {
          email: session.user.email,
        }).then(async (res) => {
          // console.log('res is ', res.data);
          await Axios.post(`/courses/student-reply`, {
            status: 1,
            roleID: res.data[0].roleID,
            email: res.data[0].email,
          }).then((res) => {
            // console.log('res.data is ', res.data);
            setCourses(res.data);
          });
        });
        setLoad(false);
      }

      async function getYear() {
        const response = await Axios.get('/setdate/getNow');
        setYearNow(response.data);
      }
      getYear();
      getCourses();
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

  const searchBox = () => {
    if (props.nisit.roleID == 1) {
      return (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
            onChange={(e) => setSearch(e.target.value)}
          />
          <SelectMajor
            onChange={(e) => {
              setMajor(e.target.value);
            }}
          />
        </div>
      );
    }
  };

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
      number_D: val.number_P,
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

  const replyTAsuccess = async (AID, CID) => {
    setError(null);
    setSuccess(null);
    //console.log("AID: ", AID);
    await Axios.put('/reply/student-reply', {
      email: session.user.email,
      studentapplyID: AID,
      status: 2,
      courseID: CID,
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
      <h1>รายชื่อนิสิตที่ยื่นขอ(อาจารย์ผู้สอน)</h1>
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
        {searchBox()}
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
        จำนวนคำร้อง:
        {courses != null && courses.length != 0 ? Filter(courses).length : 0}
        <table
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
              <th rowSpan="2">รหัสคำขอ</th>
              <th rowSpan="2">รหัสวิชา</th>
              <th rowSpan="2">ชื่อวิชา</th>

              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อาจารย์</th>
              <th rowSpan="2">อาจารย์เจ้าของวิชา</th>
              <th rowSpan="2">ชื่อผู้ยื่น</th>
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
                  <td>
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
                  <td>{val.noteapply}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-success"
                      key={key}
                      onClick={() => {
                        if (window.confirm('ต้องการยืนยันวิชา: ' + val.title))
                          replyTAsuccess(val.AID, val.CID);
                      }}
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
)(provostNisitRequest);
