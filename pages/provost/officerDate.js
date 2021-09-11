import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import Dateformat from "../../components/DateFormat";
import DatePicker from '../../components/DatePickers';
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";


function officerDate(props) {

  const [dates,setDate] = useState([]);
  const router = useRouter();
  const [session, loading] = useSession();
  const today = new Date();
  const [termNow, setTermNow] = useState([]);
  const [year, setYear] = useState(today.getFullYear() + 543);
  const [term, setTerm] = useState(null);
  const [openDate, setOpenDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());
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
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

  const setDateStudy = async () => {
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
      }).then((response) => {
        setErr(null);
        setSuccess(response.data.message);
        setDate(response.data.data);
        setTermNow(responseNow.data.data);
      });
    }
  };

  const setYearAndTermNow = async (id) => {
    await Axios.put("/setdate/setNow", {
      id: id,
    }).then((response) => {
      setErr(null);
      setSuccess(response.data.message);
    });
  };

  const edit = (id) => {
    return router.push(`/provost/setDatestop/${id}`);
  };

  const del = async (id) =>{
    await Axios.delete(`/setdate/delete/${id}`)
    .then((response) => {
      setErr(null);
      setSuccess(response.data.message);
      setDate(response.data.data);
    });
  }


  
  return (
    <div className="container">
      <h2>ตั้งค่าวันที่เรียน</h2>
      <h3>ปัจจุบัน ปี:{termNow != null && termNow.length != 0 ? termNow[0].year : "loading..."} เทอม: {termNow != null && termNow.length != 0 ? termNow[0].term : "loading..."}</h3>
      <div className="table-responsive">
      {success && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success}{" "}
            </div>
      )}
      <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">#</th>
              <th rowSpan="2">ปีการศึกษา</th>
              <th rowSpan="2">ภาคเรียน</th>
              <th rowSpan="2">วันที่เปิดเรียน</th>
              <th rowSpan="2">วันสุดท้ายของการเรียน</th>
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
                    <td>   <Dateformat date={val.openDate}/> </td>
                    <td>   <Dateformat date={val.closeDate}/> </td>
                    <td>
                    <button type="button" className="btn btn-success" onClick={()=>{
                        if (window.confirm("ยืนยันตั้งค่าปีการศึกษา " + val.year + "เทอม " + val.term+" เป็นเทอมปัจจุบัน"))
                        setYearAndTermNow(val.id);
                      }}>เทอมปัจจุบัน</button>
                      <button type="button" className="btn btn-primary" onClick={()=>edit(val.id)} >เพิ่มวันหยุด</button>
                      <button type="button" className="btn btn-danger" onClick={() => {
                        if (window.confirm("ยืนยันการลบปีการศึกษา " + val.year + "เทอม " + val.term))
                          del(val.id);
                      }}>ลบ</button>
                    </td>
                    
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
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
            <DatePicker onChange={(date) => 
                setOpenDate(date)
              } date={openDate}/>

          </div>
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              สุดท้าย
            </label>
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

          {err && (
            <div className="alert alert-danger" role="alert">
              {" "}
              {err}{" "}
            </div>
          )}

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

export default connect(mapStateToProps, mapDispatchToProps)(officerDate);

