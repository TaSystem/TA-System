import React, { useEffect, useState } from "react";
import Axios from "../../../config/Axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../../redux/actions/nisitAction";

const SetHourWorks = (props) => {
  const [workingHour, setWorkingHour] = useState(null);
  const [sec, setSec] = useState(null);
  const [day, setDay] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [course, setCourse] = useState([]);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [session, loading] = useSession();
  const [selectSecs, setSelectSecs] = useState([]);
  const [dayArray, setDayArray] = useState([]);
  const [startArray, setStartArray] = useState([]);
  const [endArray, setEndArray] = useState([]);

  useEffect(() => {
    async function getWorkingHour() {
      const response = await Axios.get(`/workinghours/${id}`);
      setWorkingHour(response.data);
    }
    async function getSecs() {
      const response = await Axios.get(`/courses/sec/${id}`);
      setSelectSecs(response.data);
    }

    async function getCourse() {
      const response = await Axios.get(`/workinghours/course/${id}`);
      setCourse(response.data);
      // const secs =  response.data[0].day.split("_");
      // setSelectSecs(response.data[0].sec_P);
      setDayArray(response.data[0].day_P.split("_"));
      setStartArray(response.data[0].start_P.split("_"));
      setEndArray(response.data[0].end_P.split("_"));
    }
    getSecs();
    getCourse();
    getWorkingHour();
  }, [id, router]);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
    }
  }, [loading, props, session]);

  const setHour = async () => {
    setErr(null);
    setSuccess(null);
    let totalHour = parseInt(end) - parseInt(start);
    // console.log("totalHour: ", totalHour);
    if(!sec){
      setErr("กรุณาเลือกหมู่ปฎิบัติงาน");
    }else if (!day) {
      setErr("กรุณาเลือกวันปฎิบัติงาน");
    } else if (!start) {
      setErr("กรุณาเลือกเวลามา");
    } else if (!end) {
      setErr("วันกรุณาเลือกเวลากลับ");
    } else if (totalHour > course[0].hrperweek) {
      setErr("เกิน "+course[0].hrperweek+" ชั่วโมง");
    } else if(course[0].sec_D==sec){
      console.log("secD");
      await Axios.post("/workinghours/add", {
        sec_D:sec,
        day_D: day,
        start_D: start,
        end_D: end,
        hour: totalHour,
        teacherapplytaID: id,
      }).then((res) => {
        if (res.data.check) {
          setSuccess(res.data.message);
          setWorkingHour([
            ...workingHour,
            {
              sec_D:sec,
              day_D: day,
              start_D: start,
              end_D: end,
              
            },
          ]);
        } else {
          setErr(res.data.message);
        }
      });
    }else{
      console.log("secP");
      await Axios.post("/workinghours/add", {
        sec_P:sec,
        day_P: day,
        start_P: start,
        end_P: end,
        hour: totalHour,
        teacherapplytaID: id,
      }).then((res) => {
        if (res.data.check) {
          setSuccess(res.data.message);
          setWorkingHour([
            ...workingHour,
            {
              sec_P:sec,
              day_P: day,
              start_P: start,
              end_P: end,
              
            },
          ]);
        } else {
          setErr(res.data.message);
        }
      });
    }
  };

  const del = async (id) => {
    setErr(null);
    setSuccess(null);
    await Axios.delete(`/workinghours/delete/${id}`).then((response) => {
      setSuccess(response.data);
      setWorkingHour(
        workingHour.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const secShow = (d, p) => {
    if (d && p) {
      return d + "," + p;
    } else if (d) {
      return d;
    } else if (p) {
      return p;
    }
  };
  
  const hourD = (day, start, end) => {
    if (day && start && end) {
      return "วัน " + day + " เวลา " + start + " - " + end;
    } else {
      return "-";
    }
  };

  const hourP = (day, start, end) => {
    if (day && start && end) {
      return day.map((val, index) => {
        return (
          <h4 key={index}>
            เวลาเรียนปฎิบัติ วัน {day[index]} เวลา {start[index]} - {end[index]}{" "}
          </h4>
        );
      });
    } else {
      return <h4>เวลาเรียนปฎิบัติ ไม่มี</h4>;
    }
  };

  return (
    <div className="container">
      <h1>เวลาปฎิบัติงาน</h1>
      <h3>
        วิชา:{course && course.length != 0 ? course[0].title : "loading..."}
        {"  "}
        รหัสวิช่า:
        {course && course.length != 0 ? course[0].courseID : "loading..."} หมู่:
        {"  "}
        {course && course.length != 0
          ? secShow(course[0].sec_D, course[0].sec_P.split("_"))
          : "loading..."}
        {"  "}
      </h3>
      <h4>
        เวลาเรียนบรรยาย{" "}
        {course && course.length != 0
          ? hourD(course[0].day_D, course[0].start_D, course[0].end_D)
          : "loading..."}
        {"    "}
      </h4>

      <>
        {course && course.length != 0
          ? hourP(dayArray, startArray, endArray)
          : "loading..."}
      </>

      <h4>
        เวลาปฎิบัติงาน{" "}
        {course && course.length != 0 ? course[0].hrperweek : "loading..."}{" "}
        ชั่วโมง
      </h4>
      {success && (
        <div className="alert alert-success" role="alert">
          {" "}
          {success}{" "}
        </div>
      )}
      {err && (
          <div className="alert alert-danger" role="alert">
            {" "}
            {err}{" "}
          </div>
        )}
      <div
        className="table-responsive"
        style={{ maxHeight: "65vh", marginTop: "1vh" }}
      >
        <table
          className="table table-hover table-borderless"
          cellSpacing="0"
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
              <th rowSpan="2">#</th>
              <th rowSpan="2">หมู่</th>
              <th rowSpan="2">วัน</th>
              <th rowSpan="2">เวลามา</th>
              <th rowSpan="2">เวลากลับ</th>
              <th rowSpan="2">การกระทำ</th>
            </tr>
          </thead>
          <tbody>
            {workingHour &&
              workingHour.length != 0 &&
              workingHour.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1} </td>
                    <td>{val.sec_D?val.sec_D:val.sec_P}</td>
                    <td>{val.day_D?val.day_D:val.day_P}</td>
                    <td> {val.start_D?val.start_D:val.start_P} </td>
                    <td> {val.end_D?val.end_D:val.end_P} </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          if (window.confirm("ยืนยันการลบเวลาปฎิบัติงาน"))
                            del(val.id);
                        }}
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                );
              })}
            {workingHour && !workingHour.length && (
              <h2 style={{ color: "red" }}>ยังไม่มีการเพิ่มเวลาปฎิบัติงาน</h2>
            )}
          </tbody>
        </table>
      </div>
      <div className="information">
        <form className="row gy-2 gx-3 ">
          <div className="col-auto">
            <label htmlFor="closeDate" className="form-label">
              หมู่เรียน
            </label>
            <select
              name="day"
              className="form-select"
              onChange={(e) => {
                setSec(e.target.value);
              }}
            >
              <option defaultValue="เลือกหมู่เรียน" disabled selected hidden>
                เลือกหมู่เรียน
              </option>

              {selectSecs.map((val, index) => {
                return <option value={val} key={index}>{val}</option>;
              })}
            </select>

          </div>
          <div className="col-auto">
            <label htmlFor="closeDate" className="form-label">
              วันปฎิบัติงาน
            </label>
            <select
              name="day"
              className="form-select"
              onChange={(e) => {
                setDay(e.target.value);
              }}
            >
              <option defaultValue="เลือกวัน" disabled selected hidden>
                เลือกวัน
              </option>
              <option value="จันทร์">จันทร์</option>
              <option value="อังคาร">อังคาร</option>
              <option value="พุธ">พุธ</option>
              <option value="พฤหัส">พฤหัส</option>
              <option value="ศุกร์">ศุกร์</option>
              <option value="เสาร์">เสาร์</option>
              <option value="อาทิตย์">อาทิตย์</option>
            </select>
          </div>

          <div className="col-auto">
            <label htmlFor="closeDate" className="form-label">
              เวลามา
            </label>
            <select
              name="start"
              className="form-select"
              onChange={(e) => {
                setStart(e.target.value);
              }}
            >
              <option defaultValue="เลือกเวลามา" disabled selected hidden>
                เลือกเวลามา
              </option>
              <option value="8.00">8.00 น.</option>
              <option value="9.00">9.00 น.</option>
              <option value="10.00">10.00 น.</option>
              <option value="11.00">11.00 น.</option>
              <option value="12.00">12.00 น.</option>
              <option value="13.00">13.00 น.</option>
              <option value="14.00">14.00 น.</option>
              <option value="15.00">15.00 น.</option>
              <option value="16.00">16.00 น.</option>
              <option value="17.00">17.00 น.</option>
              <option value="18.00">18.00 น.</option>
              <option value="19.00">19.00 น.</option>
              <option value="20.00">20.00 น.</option>
              <option value="21.00">21.00 น.</option>
              <option value="22.00">22.00 น.</option>
            </select>
          </div>

          <div className="col-auto">
            <label htmlFor="closeDate" className="form-label">
              เวลากลับ
            </label>
            <select
              name="nameBank"
              className="form-select"
              onChange={(e) => {
                setEnd(e.target.value);
              }}
            >
              <option defaultValue="เลือกเวลากลับ" disabled selected hidden>
                เลือกเวลากลับ
              </option>
              <option value="8.00">8.00 น.</option>
              <option value="9.00">9.00 น.</option>
              <option value="10.00">10.00 น.</option>
              <option value="11.00">11.00 น.</option>
              <option value="12.00">12.00 น.</option>
              <option value="13.00">13.00 น.</option>
              <option value="14.00">14.00 น.</option>
              <option value="15.00">15.00 น.</option>
              <option value="16.00">16.00 น.</option>
              <option value="17.00">17.00 น.</option>
              <option value="18.00">18.00 น.</option>
              <option value="19.00">19.00 น.</option>
              <option value="20.00">20.00 น.</option>
              <option value="21.00">21.00 น.</option>
              <option value="22.00">22.00 น.</option>
            </select>
          </div>

          <div className="col-auto">
            <button
              type="button"
              className="btn btn-success"
              onClick={setHour}
              style={{ margin: "32px 0 0 1vw" }}
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetHourWorks);
