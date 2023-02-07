import React, { useState, useEffect } from 'react';
import Axios from '../../config/Axios';
import { signIn, signOut, useSession } from 'next-auth/client';
import { connect } from 'react-redux';
import {
  getDetailNisit,
  getCoursesNisit,
} from '../../redux/actions/nisitAction';

function RequestTA(props) {
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState(null);
  const [note, setNote] = useState(null);
  const [yearNow, setYearNow] = useState([]);
  const [system, setSystem] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [session, loading] = useSession();
  // const [dayArray, setDayArray] = useState([]);
  // const [startArray, setStartArray] = useState([]);
  // const [endArray, setEndArray] = useState([]);
  var syStatus =
    system != null && system.length != 0 ? system[0].status : 'loading...';

  useEffect(() => {
    async function getCourses() {
      const response = await Axios.get('/courses/student');
      setCourseList(response.data);
      // setDayArray(response.data[0].day_P.split("_"));
      // setStartArray(response.data[0].start_P.split("_"));
      // setEndArray(response.data[0].end_P.split("_"));
    }
    async function getYear() {
      const response = await Axios.get('/setdate/getNow');
      setYearNow(response.data);
    }
    async function getSystem() {
      const response = await Axios.get('/system/2');
      setSystem(response.data);
    }

    getYear();
    getSystem();
    getCourses();
  }, []);

  useEffect(() => {
    // console.log("useEffect 2");
    if (session && props.nisit.length == 0) {
      // console.log("useEffect get getDetailNisit");
      props.getDetailNisit(session.user.email);
    }
    // if (session && props.courses.length == 0){
    // console.log("useEffect get getCoursesNisit");
    // }
  }, [loading, props, session]);

  function Filter(courses) {
    return courses.filter((course) => {
      if (!search) {
        return course;
      } else if (course.title.toLowerCase().includes(search.toLowerCase())) {
        return course;
      } else if (course.courseID.toLowerCase().includes(search.toLowerCase())) {
        return course;
      } else if (course.teacher.toLowerCase().includes(search.toLowerCase())) {
        return course;
      }
    });
  }

  const showSec = (sec_P) => {
    let arraySec = sec_P.split('_');
    return arraySec.map((val, index) => {
      if (arraySec.length == index + 1) {
        return <>{val}</>;
      } else {
        return <>{val},</>;
      }
    });
  };

  const hourTA = (d, p, CID) => {
    if (CID == '03602312') return 2;
    else if (CID == '03602362') return 4;
    else if (d && p) return 5;
    else if (d && !p) return 2;
    else if (p && !d) return 3;
  };

  const applyTA = async (id, hr) => {
    setSuccess(null);
    setError(null);
    await Axios.post('/apply/student-apply', {
      userID: props.nisit.userID,
      level: props.nisit.level,
      courseID: id,
      hrperweek: hr,
      status: 1,
      noteapply: note,
    }).then((res) => {
      if (res.data.check) {
        setSuccess(res.data.message);
      } else {
        setError(res.data.message);
      }
    });
  };

  const hourP = (day, start, end) => {
    if (day && start && end) {
      let dayArray = day.split('_');
      let startArray = start.split('_');
      let endArray = end.split('_');
      return dayArray.map((val, index) => {
        return (
          <p key={index}>
            เวลาเรียนปฎิบัติ วัน {dayArray[index]} เวลา {startArray[index]} -{' '}
            {endArray[index]}{' '}
          </p>
        );
      });
    } else {
      return <p>เวลาเรียนปฎิบัติ -</p>;
    }
  };

  if (typeof window !== 'undefined' && loading) return null;

  if (!session) {
    console.log('in that case');
    return (
      <div>
        <h2>You aren&apos;t signed in, please sign in first</h2>
      </div>
    );
  } else if (!syStatus) {
    return (
      <div>
        <h2>ระบบรับสมัครนิสิตช่วยงานถูกปิด</h2>
      </div>
    );
  }

  console.log('props in requestTA  >> ', props.nisit);
  console.log('session in requestTA ', session);

  //จำนวนชั่วโฒง
  return (
    <div className="container">
      <h1>
        ลงทะเบียนSA{' '}
        {props.nisit.level == 'ปริญญาตรี'
          ? '(ขอได้ไม่เกิน 10 ชั่วโมง)'
          : '(ขอได้ไม่จำกัดชั่วโมง)'}
      </h1>
      {/* <h2>ระบบ {syStatus?"เปิด":"ปิด"}</h2> */}
      <h2>
        ปี{' '}
        {yearNow != null && yearNow.length != 0
          ? yearNow[0].year
          : 'loading...'}{' '}
        เทอม{' '}
        {yearNow != null && yearNow.length != 0
          ? yearNow[0].term
          : 'loading...'}{' '}
      </h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
        onChange={(e) => setSearch(e.target.value)}
      />
      จำนวนคำร้อง:
      {courseList != null && courseList.length != 0
        ? Filter(courseList).length
        : 0}
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
      <div className="information">
        {Filter(courseList).map((val, key) => {
          return (
            <div className="card text-center mb-2" key={key}>
              <div className="card-header">{val.courseID}</div>
              <div className="card-body">
                <h5 className="card-title">
                  {val.title} หมู่เรียน {val.sec_D}
                  {val.sec_D && val.sec_P ? ',' : ''}
                  {showSec(val.sec_P)}{' '}
                </h5>
                <p className="card-text">
                  เวลาเรียนบรรยาย {val.day_D ? val.day_D : ''}{' '}
                  {val.start_D ? val.start_D + ' - ' + val.end_D : '-'}
                </p>

                {hourP(val.day_P, val.start_P, val.end_P)}

                <p className="card-text">
                  คณะ:{val.major} อาจารย์:{val.teacher}
                </p>

                <form>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name={key}
                      id={key}
                      placeholder="หมายเหตุ(ไม่กรอกก็ได้)"
                      onChange={(e) => setNote(e.target.value)}
                      key={key}
                    />
                    <button
                      type="button"
                      className="btn btn-success"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      onClick={() => {
                        if (window.confirm('ต้องการยืนขอวิชา: ' + val.title))
                          applyTA(
                            val.id,
                            hourTA(val.sec_D, val.sec_P, val.courseID)
                          );
                      }}
                    >
                      ส่งคำร้อง{' '}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        })}
        {courseList && !courseList.length && (
          <h2 style={{ color: 'red' }}>ไม่มีรายวิชาที่เปิดสอนรับ SA</h2>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
  courses: state.nisit.courses,
});

const mapDispatchToProps = {
  // setRegisterNisit: setRegisterNisit,
  getDetailNisit: getDetailNisit,
  getCoursesNisit: getCoursesNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestTA);
