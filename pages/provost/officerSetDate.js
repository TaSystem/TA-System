import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { useSession } from "next-auth/client";
import DatePicker from '../../components/DatePickers'
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";

function officerSetDate(props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear() + 543);
  const [term, setTerm] = useState(null);
  const [openDate, setOpenDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());
  const [titleDay, setTitleDay] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [yearSelect, setYearSelect] = useState([]);
  const [termSelect, setTermSelect] = useState([]);
  const [yearNow, setYearNow] = useState(null);
  const [termNow, setTermNow] = useState(null);
  const [err1, setErr1] = useState(null);
  const [err2, setErr2] = useState(null);
  const [success1, setSuccess1] = useState(null);
  const [success2, setSuccess2] = useState(null);
  const [err3, setErr3] = useState(null);
  const [success3, setSuccess3] = useState(null);
  const [session, loading] = useSession();

  useEffect(() => {
    async function getYear() {
      const response = await Axios.get("/setdate/year");
      setYearSelect(response.data);
      console.log("yearSelect: ", response.data);
    }
    async function getTerm() {
      const response = await Axios.get("/setdate/term");
      setTermSelect(response.data);
    }
    getYear();
    getTerm();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

  const setDateStudy = async () => {
    if (!year) {
      setErr1("กรุณากรอกปีการศึกษา");
    } else if (!term) {
      setErr1("กรุณาเลือกภาคเรียน");
    } else if (!openDate) {
      setErr1("กรุณาเลือกวันที่เริ่ม");
    } else if (!closeDate) {
      setErr1("กรุณาเลือกวันสุดท้าย");
    } else {
      await Axios.post("/setdate/setDateStudy", {
        year: year,
        term: term,
        openDate: openDate,
        closeDate: closeDate,
      }).then((response) => {
        setErr1(null);
        setSuccess1(response.data);
      });
    }
  };
  
  const setDateStop = async () => {
    if (!titleDay) {
      setErr2("กรุณากรอกหัวข้อวันหยุด");
    } else if (!startDate) {
      setErr2("กรุณาเลือกวันที่เริ่มหยุด");
    } else if (!endDate) {
      setErr2("วันกรุณาเลือกสุดท้ายที่หยุด");
    } else {
      await Axios.post("/setdate/setDateStop", {
        title: titleDay,
        startDate: startDate,
        endDate: endDate,
      }).then((response) => {
        setErr2(null);
        setSuccess2(response.data);
      });
    }
  };

  const setYearAndTermNow = async () => {
    await Axios.post("/setdate/setNow", {
      year: yearNow,
      term: termNow,
    }).then((response) => {
      setErr3(null);
      setSuccess3(response.data);
    });
  };

  console.log(startDate)

  return (
    <div className="container">
      <h1>ตั้งค่าวันที่</h1>

      <hr />
      <h2>ตั้งค่าวันเรียน</h2>
      <div class="information">
        <form className="row gy-2 gx-3 align-items-center">
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              ปีการศึกษา
            </label>
            <input
              defaultValue={today.getFullYear() + 543}
              type="text"
              className="form-control"
              name="year"
              placeholder="ปีการศึกษา"
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </div>
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              ภาคเรียน
            </label>
            <select
              name="term"
              class="form-select"
              onChange={(e) => {
                setTerm(e.target.value);
              }}
            >
              <option value={null} disabled selected hidden>
                ภาคเรียน
              </option>
              <option value="ฤดูร้อน">ฤดูร้อน</option>
              <option value="ต้น">ต้น</option>
              <option value="ปลาย">ปลาย</option>
            </select>
          </div>
          <div class="col-auto">
            <label for="openDate" class="form-label">
              เริ่ม
            </label>
            {/* <input
              type="date"
              className="form-control"
              name="openDate"
              id="openDate"
              onChange={(e) => {
                setOpenDate(e.target.value);
              }}
            /> */}
            <DatePicker onChange={(date) => 
                setOpenDate(date)
              } date={openDate}/>

          </div>
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              สุดท้าย
            </label>
            {/* <input
              type="date"
              className="form-control"
              name="closeDate"
              id="closeDate"
              onChange={(e) => {
                setCloseDate(e.target.value);
              }}
            /> */}
            <DatePicker onChange={(date) => 
                setCloseDate(date)
              } date={closeDate}/>
          </div>

          <div className="col-auto">
            <button
              type="button"
              className="btn btn-success"
              onClick={setDateStudy}
            >
              บันทึก
            </button>
          </div>

          {err1 && (
            <div className="alert alert-danger" role="alert">
              {" "}
              {err1}{" "}
            </div>
          )}
          {success1 && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success1}{" "}
            </div>
          )}

        </form>
      </div>

      <h2>ตั้งค่าวันหยุด</h2>
      <div class="information">
        <form
          class="row gy-2 gx-3 align-items-center"
          encType="multipart/form-data"
        >
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              หัวข้อวันหยุด
            </label>
            <input
              type="text"
              className="form-control"
              name="year"
              placeholder="หยุดเนื่องในวัน"
              onChange={(e) => {
                setTitleDay(e.target.value);
              }}
            />
          </div>

          <div class="col-auto">
            <label for="startDate" class="form-label">
              ตั้งแต่
            </label>
            {/* <input
              type="date"
              className="form-control"
              name="startDate"
              id="startDate"
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            /> */}
            <DatePicker onChange={(date) => 
                setStartDate(date)
              } date={startDate}/>
            
          </div>
          <div class="col-auto">
            <label for="endDate" class="form-label">
              ถึง
            </label>
            {/* <input
              type="date"
              className="form-control"
              name="endDate"
              id="endDate"
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            /> */}
            <DatePicker onChange={(date) => 
                setEndDate(date)
              } date={endDate}/>
          </div>
          {err2 && (
            <div className="alert alert-danger" role="alert">
              {" "}
              {err2}{" "}
            </div>
          )}
          {success2 && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success2}{" "}
            </div>
          )}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={setDateStop}
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
      <h2>ตั้งค่าปีการศึกษาและภาคเรียนปัจจุบัน</h2>
      <div className="information">
        <form class="row gy-2 gx-3 align-items-center">
          <div class="col-auto">
            <label for="yearSelect" class="form-label">
              ปีการศึกษา
            </label>

            <select
              class="form-select"
              name="yearSelect"
              onChange={(e) => {
                setYearNow(e.target.value);
              }}
            >
              <option value={null} disabled selected hidden>
                ปีการศึกษา
              </option>

              {yearSelect.map((val, key) => {
                return <option value={val.year}>{val.year}</option>;
              })}
            </select>
          </div>
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              ภาคเรียน
            </label>
            <select
              name="term"
              class="form-select"
              onChange={(e) => {
                setTermNow(e.target.value);
              }}
            >
              <option value={null} disabled selected hidden>
                ภาคเรียน
              </option>
              {termSelect.map((val, key) => {
                return <option value={val.term}>{val.term}</option>;
              })}
            </select>
          </div>
          {err3 && (
            <div className="alert alert-danger" role="alert">
              {" "}
              {err3}{" "}
            </div>
          )}
          {success3 && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success3}{" "}
            </div>
          )}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={setYearAndTermNow}
            >
              บันทึก
            </button>
          </div>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(officerSetDate);

