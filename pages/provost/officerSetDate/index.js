import React, { useState, useEffect } from "react";
import Axios from "../../../config/Axios";
import Dateformat from "../../../components/DateFormat";
import DatePicker from "../../../components/DatePickers";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../../redux/actions/nisitAction";

function officerSetDate(props) {
  const [dates, setDate] = useState([]);
  const router = useRouter();
  const [session, loading] = useSession();
  const today = new Date();
  const [termNow, setTermNow] = useState([]);
  const [year, setYear] = useState(today.getFullYear() + 543);
  const [term, setTerm] = useState(null);
  const [openDate, setOpenDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());
  const [category, setCategory] = useState(null);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function getDates() {
      const response = await Axios.get("/setdate");
      const responseNow = await Axios.get("/setdate/getNow");
      setDate(response.data);
      setTermNow(responseNow.data);
    }
    getDates();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
    }
  }, [loading]);

  const setDateStudy = async () => {
    // console.log("category: ", category);
    if (!year) {
      setErr("กรุณากรอกปีการศึกษา");
    } else if (!term) {
      setErr("กรุณาเลือกภาคเรียน");
    } else if (!openDate) {
      setErr("กรุณาเลือกวันที่เริ่ม");
    } else if (!closeDate) {
      setErr("กรุณาเลือกวันสุดท้าย");
    } else {
      await Axios.post("/setdate/setDateStudy", {
        year: year,
        term: term,
        openDate: openDate,
        closeDate: closeDate,
        category: category,
      }).then((response) => {
        setErr(null);
        setSuccess(response.data.message);
        setDate(response.data.data);
        setYear(today.getFullYear() + 543);
        setTerm(null);
        setOpenDate(new Date());
        setCloseDate(new Date());
        setCategory(null);
      });
    }
  };

  const setYearAndTermNow = async (value) => {
    // console.log(value.year, value.term);
    await Axios.put("/setdate/setNow", {
      id: value.id,
      year: value.year,
      term: value.term,
    }).then((response) => {
      // console.log("value: ", value);
      setErr(null);
      setSuccess(response.data.message);
      setTermNow(response.data.data);
    });
  };

  const edit = (id) => {
    return router.push(`/provost/officerSetDate/${id}`);
  };

  const del = async (id) => {
    await Axios.delete(`/setdate/delete-datestudy/${id}`).then((response) => {
      setErr(null);
      setSuccess(response.data.message);
      setDate(response.data.data);
    });
  };

  return (
    <div className="container">
      <h2>ตั้งค่าวันที่เรียน</h2>
      <h3>
        ปัจจุบัน ปี:
        {termNow != null && termNow.length != 0
          ? termNow[0].year
          : "loading..."}{" "}
        เทอม:{" "}
        {termNow != null && termNow.length != 0
          ? termNow[0].term
          : "loading..."}
      </h3>
      {success && (
        <div className="alert alert-success" role="alert">
          {" "}
          {success}{" "}
        </div>
      )}
      <div
        className="table-responsive"
        style={{ maxHeight: "70vh", maxWidth: "80vw", marginTop: "1vh" }}
      >
        <table
          className="table table-hover table-bordered"
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
              <th rowSpan="2">#</th>
              <th rowSpan="2">ปีการศึกษา</th>
              <th rowSpan="2">ภาคเรียน</th>
              <th rowSpan="2">วันที่เปิดเรียน</th>
              <th rowSpan="2">วันสุดท้ายของการเรียน</th>
              <th rowSpan="2">ประเภท</th>
              <th rowSpan="2">การกระทำ</th>
            </tr>
          </thead>
          <tbody>
            {dates.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1} </td>
                  <td>{val.year}</td>
                  <td>{val.term}</td>
                  <td>
                    {" "}
                    <Dateformat date={val.openDate} />{" "}
                  </td>
                  <td>
                    {" "}
                    <Dateformat date={val.closeDate} />{" "}
                  </td>
                  <td> {val.category == 0 ? "ธรรมดา" : "พิเศษ"} </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        if (
                          window.confirm(
                            "ยืนยันตั้งค่าปีการศึกษา " +
                              val.year +
                              "เทอม " +
                              val.term +
                              " เป็นเทอมปัจจุบัน"
                          )
                        )
                          setYearAndTermNow(val);
                      }}
                    >
                      เทอมปัจจุบัน
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => edit(val.id)}
                      style={{ margin: "0 20px" }}
                    >
                      เพิ่มวันหยุด
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "ยืนยันการลบปีการศึกษา " +
                              val.year +
                              "เทอม " +
                              val.term
                          )
                        )
                          del(val.id);
                      }}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div class="information">
        <form className="row gy-2 gx-3 ">
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

              <option value="ต้น">ต้น</option>
              <option value="ปลาย">ปลาย</option>
            </select>
          </div>
          <div class="col-auto">
            <label for="openDate" class="form-label">
              เริ่ม
            </label>
            <div>
              <DatePicker
                onChange={(date) => setOpenDate(date)}
                date={openDate}
              />
            </div>
          </div>
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              สุดท้าย
            </label>
            <div>
              <DatePicker
                onChange={(date) => setCloseDate(date)}
                date={closeDate}
              />
            </div>
          </div>
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              ประเภท
            </label>
            <select
              name="term"
              class="form-select"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value={null} disabled selected hidden>
                เลือกประเภท
              </option>
              <option value={0}>ธรรมดา</option>
              <option value={1}>พิเศษ</option>
            </select>
          </div>

          <div className="col-auto">
            <button
              type="button"
              className="btn btn-success"
              onClick={setDateStudy}
              style={{ margin: "32px 0 0 1vw" }}
            >
              บันทึก
            </button>
          </div>
        </form>
        {err && (
          <div className="alert alert-danger" role="alert">
            {" "}
            {err}{" "}
          </div>
        )}
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
